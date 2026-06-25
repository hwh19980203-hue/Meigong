import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

async function readDotEnvValue(name) {
  const envPath = path.join(os.homedir(), ".codex", ".env");
  let content;
  try {
    content = await fs.readFile(envPath, "utf8");
  } catch {
    return undefined;
  }

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || match[1] !== name) {
      continue;
    }
    return match[2].replace(/^["']|["']$/g, "");
  }

  return undefined;
}

const API_BASE_URL = (process.env.OTUAPI_BASE_URL || "https://otuapi.com").replace(/\/+$/, "");
let API_KEY = process.env.OTUAPI_API_KEY;
API_KEY ||= await readDotEnvValue("OTUAPI_API_KEY");
const DEFAULT_IMAGE_MODEL = process.env.OTUAPI_IMAGE_MODEL || process.env.OTUAPI_IMAGE_DEFAULT_MODEL || "image2";
const DEFAULT_OUTPUT_DIR = process.env.OTUAPI_IMAGE_OUTPUT_DIR || "D:\\黑伞美工\\raw\\assets\\generated";
const VIDEO_TASK_POLL_INTERVAL_MS = Number(process.env.OTUAPI_VIDEO_TASK_POLL_INTERVAL_MS || 5000);
const VIDEO_TASK_MAX_POLLS = Number(process.env.OTUAPI_VIDEO_TASK_MAX_POLLS || 48);

function requireApiKey() {
  if (!API_KEY) {
    throw new Error("Missing OTUAPI_API_KEY. Set it in your user environment or C:\\Users\\Q\\.codex\\.env, then restart Codex.");
  }
}

function safeSlug(text) {
  return String(text)
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 48) || "image";
}

function decodeImagePayload(value) {
  if (!value || typeof value !== "string") {
    throw new Error("Image response did not include a usable b64_json or url field.");
  }

  const dataUrlMatch = value.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.*)$/s);
  if (dataUrlMatch) {
    return {
      extension: dataUrlMatch[1].toLowerCase().replace("jpeg", "jpg"),
      buffer: Buffer.from(dataUrlMatch[2], "base64")
    };
  }

  return {
    extension: "png",
    buffer: Buffer.from(value, "base64")
  };
}

function extensionFromMimeType(mimeType) {
  const normalized = String(mimeType || "image/png").toLowerCase();
  if (normalized.includes("webp")) {
    return "webp";
  }
  if (normalized.includes("jpeg") || normalized.includes("jpg")) {
    return "jpg";
  }
  return "png";
}

function sniffImageMimeType(buffer) {
  if (buffer.length >= 12 && buffer.subarray(0, 4).equals(Buffer.from([0x52, 0x49, 0x46, 0x46])) && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    return "image/webp";
  }
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (buffer.length >= 3 && buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) {
    return "image/jpeg";
  }
  return "image/png";
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image URL: ${response.status} ${response.statusText}`);
  }
  const contentType = (response.headers.get("content-type") || "image/png").split(";")[0].trim();
  return {
    extension: extensionFromMimeType(contentType),
    mimeType: contentType,
    buffer: Buffer.from(await response.arrayBuffer())
  };
}

async function callImageApi(route, body) {
  requireApiKey();

  const response = await fetch(`${API_BASE_URL}${route}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Image API returned non-JSON response: ${text.slice(0, 500)}`);
  }

  if (!response.ok) {
    throw new Error(`Image API error ${response.status}: ${JSON.stringify(json).slice(0, 1000)}`);
  }

  return json;
}

async function getImageApi(route) {
  requireApiKey();

  const response = await fetch(`${API_BASE_URL}${route}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });

  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Image API returned non-JSON response: ${text.slice(0, 500)}`);
  }

  if (!response.ok) {
    throw new Error(`Image API error ${response.status}: ${JSON.stringify(json).slice(0, 1000)}`);
  }

  return json;
}

async function saveImageFile(image, outputDir, filenamePrefix) {
  const resolvedOutputDir = path.resolve(outputDir || DEFAULT_OUTPUT_DIR);
  await fs.mkdir(resolvedOutputDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${timestamp}-${safeSlug(filenamePrefix)}.${image.extension}`;
  const filePath = path.join(resolvedOutputDir, fileName);
  await fs.writeFile(filePath, image.buffer);

  return filePath;
}

async function saveFirstOpenAIImage(json, outputDir, filenamePrefix) {
  const first = Array.isArray(json.data) ? json.data[0] : undefined;
  if (!first) {
    throw new Error(`Image API response did not contain data[0]: ${JSON.stringify(json).slice(0, 1000)}`);
  }

  const image = first.b64_json
    ? decodeImagePayload(first.b64_json)
    : first.url
      ? await downloadImage(first.url)
      : undefined;

  if (!image) {
    throw new Error(`Image API response did not contain b64_json or url: ${JSON.stringify(first).slice(0, 1000)}`);
  }

  return saveImageFile(image, outputDir, filenamePrefix);
}

function imageDataFromInput(value) {
  if (!value || typeof value !== "string") {
    throw new Error("Reference image must be a URL, base64 string, or data URL.");
  }

  const dataUrlMatch = value.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.*)$/s);
  if (dataUrlMatch) {
    return {
      mimeType: dataUrlMatch[1],
      data: dataUrlMatch[2].replace(/\s+/g, "")
    };
  }

  const buffer = Buffer.from(value.replace(/\s+/g, ""), "base64");
  return {
    mimeType: sniffImageMimeType(buffer),
    data: buffer.toString("base64")
  };
}

function videoImageInputFromInput(value) {
  if (isHttpUrl(value) || /^data:image\/[a-zA-Z0-9+.-]+;base64,/s.test(value)) {
    return value;
  }

  const image = imageDataFromInput(value);
  return `data:${image.mimeType};base64,${image.data}`;
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

async function inlineDataPartFromInput(value) {
  if (isHttpUrl(value)) {
    const image = await downloadImage(value);
    return {
      inlineData: {
        mimeType: image.mimeType || sniffImageMimeType(image.buffer),
        data: image.buffer.toString("base64")
      }
    };
  }

  return {
    inlineData: imageDataFromInput(value)
  };
}

function aspectRatioFromSize(size) {
  const match = String(size || "").match(/^(\d+)x(\d+)$/i);
  if (!match) {
    return undefined;
  }

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) {
    return undefined;
  }

  const ratios = ["1:1", "1:4", "4:1", "1:8", "8:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"];
  const target = width / height;
  return ratios
    .map((ratio) => {
      const [rw, rh] = ratio.split(":").map(Number);
      return { ratio, diff: Math.abs(Math.log(target / (rw / rh))) };
    })
    .sort((a, b) => a.diff - b.diff)[0].ratio;
}

async function buildGenerateContentBody(prompt, images, size) {
  const parts = [{ text: prompt }];
  for (const image of images || []) {
    parts.push(await inlineDataPartFromInput(image));
  }

  const generationConfig = {
    responseModalities: ["TEXT", "IMAGE"]
  };
  const aspectRatio = aspectRatioFromSize(size);
  if (aspectRatio) {
    generationConfig.imageConfig = { aspectRatio };
  }

  return {
    contents: [
      {
        role: "user",
        parts
      }
    ],
    generationConfig
  };
}

function buildVideosBody(prompt, model, images, size) {
  const body = {
    model,
    prompt,
    aspect_ratio: aspectRatioFromSize(size) || "auto"
  };

  if (images?.length) {
    body.images = images.map(videoImageInputFromInput);
  }

  return body;
}

function modelRouteSegment(model) {
  return encodeURIComponent(String(model).replace(/^models\//, ""));
}

function usesVideosApi(model, apiFormat) {
  if (apiFormat === "videos") {
    return true;
  }
  if (apiFormat !== "auto") {
    return false;
  }
  return /^nano_banana/i.test(model);
}

function usesGenerateContent(model, apiFormat) {
  if (apiFormat === "generate_content") {
    return true;
  }
  if (apiFormat !== "auto") {
    return false;
  }
  return /^gemini-/i.test(model);
}

async function saveFirstGenerateContentImage(json, outputDir, filenamePrefix) {
  const parts = json?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) {
    throw new Error(`generateContent response did not contain candidates[0].content.parts: ${JSON.stringify(json).slice(0, 1000)}`);
  }

  const text = parts
    .map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();
  const url = json?.data?.[0]?.url || parts.find((part) => part.image_url?.url)?.image_url?.url;
  if (url) {
    const filePath = await saveImageFile(await downloadImage(url), outputDir, filenamePrefix);
    return { filePath, text, url };
  }

  const imagePart = parts.find((part) => part.inlineData?.data || part.inline_data?.data);
  const inlineData = imagePart?.inlineData || imagePart?.inline_data;
  if (!inlineData?.data) {
    throw new Error(`generateContent response did not contain image_url, data[0].url, or inline image data: ${JSON.stringify(json).slice(0, 1000)}`);
  }

  const mimeType = inlineData.mimeType || inlineData.mime_type || "image/png";
  const filePath = await saveImageFile(
    {
      extension: extensionFromMimeType(mimeType),
      buffer: Buffer.from(inlineData.data, "base64")
    },
    outputDir,
    filenamePrefix
  );

  return { filePath, text };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForVideoTask(initialTask) {
  if (!initialTask?.id) {
    throw new Error(`Video task response did not include an id: ${JSON.stringify(initialTask).slice(0, 1000)}`);
  }

  let task = initialTask;
  for (let poll = 0; poll < VIDEO_TASK_MAX_POLLS; poll += 1) {
    if (task.status === "completed" || task.status === "failed") {
      return task;
    }

    await sleep(VIDEO_TASK_POLL_INTERVAL_MS);
    task = await getImageApi(`/v1/videos/${encodeURIComponent(initialTask.id)}`);
  }

  return task;
}

async function saveVideoTaskImage(initialTask, outputDir, filenamePrefix) {
  const task = await waitForVideoTask(initialTask);
  if (task.status !== "completed") {
    throw new Error(`Video image task did not complete: ${JSON.stringify(task).slice(0, 1000)}`);
  }
  if (!task.url) {
    throw new Error(`Completed video image task did not include a url: ${JSON.stringify(task).slice(0, 1000)}`);
  }

  const filePath = await saveImageFile(await downloadImage(task.url), outputDir, filenamePrefix);
  return { filePath, task };
}

const commonSchema = {
  prompt: z.string().min(1).describe("图片提示词。"),
  model: z.string().trim().min(1).default(DEFAULT_IMAGE_MODEL).describe("图片模型，例如 image2 或 nano_banana_2。"),
  api_format: z.enum(["auto", "openai_images", "generate_content", "videos"]).default("auto").describe("接口格式；auto 会对 nano_banana* 使用 /v1/videos，对 gemini-* 使用 generateContent。"),
  size: z.string().default("1024x1024").describe("图片尺寸，例如 1024x1024、1024x1792、1792x1024。"),
  output_dir: z.string().optional().describe("保存目录，默认保存到知识库 raw/assets/generated。"),
  filename_prefix: z.string().default("otuapi-image").describe("输出文件名前缀。")
};

const server = new McpServer({
  name: "otuapi-image-mcp",
  version: "0.1.0"
});

server.tool(
  "generate_image",
  "使用 otuapi 的指定模型生成图片，可选参考图 URL/base64/data URL。",
  {
    ...commonSchema,
    images: z.array(z.string()).default([]).describe("参考图 URL、base64 或 data URL，最多 10 张。")
  },
  async ({ prompt, model, api_format, size, images, output_dir, filename_prefix }) => {
    if (usesVideosApi(model, api_format)) {
      const body = buildVideosBody(prompt, model, images, size);
      const json = await callImageApi("/v1/videos", body);
      const result = await saveVideoTaskImage(json, output_dir, filename_prefix);

      return {
        content: [
          {
            type: "text",
            text: `图片任务已完成并保存：${result.filePath}`
          }
        ],
        structuredContent: {
          file_path: result.filePath,
          size,
          model,
          api_format: "videos",
          task_id: result.task.id,
          task_status: result.task.status,
          task_url: result.task.url
        }
      };
    }

    if (usesGenerateContent(model, api_format)) {
      const body = await buildGenerateContentBody(prompt, images, size);
      const json = await callImageApi(`/v1beta/models/${modelRouteSegment(model)}:generateContent`, body);
      const result = await saveFirstGenerateContentImage(json, output_dir, filename_prefix);

      return {
        content: [
          {
            type: "text",
            text: `图片已生成并保存：${result.filePath}${result.text ? `\n模型返回文本：${result.text}` : ""}`
          }
        ],
        structuredContent: {
          file_path: result.filePath,
          size,
          model,
          api_format: "generate_content",
          text: result.text,
          url: result.url
        }
      };
    }

    const body = {
      model,
      prompt,
      size
    };

    if (images?.length) {
      body.image = images.length === 1 ? images[0] : images;
    }

    const json = await callImageApi("/v1/images/generations", body);
    const filePath = await saveFirstOpenAIImage(json, output_dir, filename_prefix);

    return {
      content: [
        {
          type: "text",
          text: `图片已生成并保存：${filePath}`
        }
      ],
      structuredContent: {
        file_path: filePath,
        size,
        model,
        api_format: "openai_images"
      }
    };
  }
);

server.tool(
  "edit_image",
  "使用 otuapi 的指定模型按参考图改图，图片可传 URL/base64/data URL。",
  {
    ...commonSchema,
    images: z.array(z.string()).min(1).max(10).describe("要编辑的图片 URL、base64 或 data URL，最多 10 张。")
  },
  async ({ prompt, model, api_format, size, images, output_dir, filename_prefix }) => {
    if (usesVideosApi(model, api_format)) {
      const body = buildVideosBody(prompt, model, images, size);
      const json = await callImageApi("/v1/videos", body);
      const result = await saveVideoTaskImage(json, output_dir, filename_prefix);

      return {
        content: [
          {
            type: "text",
            text: `图片任务已完成并保存：${result.filePath}`
          }
        ],
        structuredContent: {
          file_path: result.filePath,
          size,
          model,
          api_format: "videos",
          task_id: result.task.id,
          task_status: result.task.status,
          task_url: result.task.url
        }
      };
    }

    if (usesGenerateContent(model, api_format)) {
      const body = await buildGenerateContentBody(prompt, images, size);
      const json = await callImageApi(`/v1beta/models/${modelRouteSegment(model)}:generateContent`, body);
      const result = await saveFirstGenerateContentImage(json, output_dir, filename_prefix);

      return {
        content: [
          {
            type: "text",
            text: `图片已编辑并保存：${result.filePath}${result.text ? `\n模型返回文本：${result.text}` : ""}`
          }
        ],
        structuredContent: {
          file_path: result.filePath,
          size,
          model,
          api_format: "generate_content",
          text: result.text,
          url: result.url
        }
      };
    }

    const json = await callImageApi("/v1/images/edits", {
      model,
      prompt,
      size,
      image: images.length === 1 ? images[0] : images
    });
    const filePath = await saveFirstOpenAIImage(json, output_dir, filename_prefix);

    return {
      content: [
        {
          type: "text",
          text: `图片已编辑并保存：${filePath}`
        }
      ],
      structuredContent: {
        file_path: filePath,
        size,
        model,
        api_format: "openai_images"
      }
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
