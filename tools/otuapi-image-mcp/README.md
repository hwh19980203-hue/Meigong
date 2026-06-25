# otuapi-image-mcp

给 Codex 使用的本地 MCP 工具，连接章鱼哥/otuapi 的图片接口。

## 环境变量

必须设置：

```powershell
setx OTUAPI_API_KEY "你的兑换码或 API Key"
```

可选设置：

```powershell
setx OTUAPI_BASE_URL "https://otuapi.com"
setx OTUAPI_IMAGE_OUTPUT_DIR "D:\黑伞美工\raw\assets\generated"
setx OTUAPI_IMAGE_MODEL "image2"
```

设置后重启 Codex。

## 工具

- `generate_image`: 文生图，或带参考图生成。
- `edit_image`: 图生图/改图。

默认模型：`image2`。

模型与接口格式：

- `image2` 默认走 OpenAI 兼容图片接口：`/v1/images/generations` 或 `/v1/images/edits`。
- `nano_banana_2`、`nano_banana_pro-*` 默认走异步图片任务接口：`POST /v1/videos`，并轮询 `GET /v1/videos/{task_id}` 后下载结果图。
- `gemini-3-pro-image-preview`、`gemini-3.1-flash-image-preview` 默认走 Gemini 原生同步接口：`/v1beta/models/{model}:generateContent`。
- 也可以通过 `api_format` 强制指定：`auto`、`openai_images`、`generate_content`、`videos`。
- `generateContent` 请求会写入 `generationConfig.responseModalities = ["TEXT", "IMAGE"]`，并把 `1024x1024` 等尺寸转换为 `imageConfig.aspectRatio`。
- `videos` 请求会把 `1024x1024` 等尺寸转换为顶层 `aspect_ratio`，参考图字段使用顶层 `images`。

默认保存目录：`D:\黑伞美工\raw\assets\generated`。

## Banana 快速调用

`nano_banana_2` 直接通过 `model` 参数传入，`api_format` 保持默认 `auto` 即可；MCP 会自动走 `/v1/videos`。

```json
{
  "prompt": "生成亚马逊 A+ 图片，保留参考图产品外观一致性。",
  "model": "nano_banana_2",
  "size": "1792x1024",
  "images": ["https://example.com/reference.png"],
  "filename_prefix": "773-a-plus-04"
}
```

如果另一个 Codex 窗口已经打开，需要重启 Codex 或重载 MCP 后，才能看到 `model`、`api_format` 等新参数。
