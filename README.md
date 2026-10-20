# AI Text Reveal

面向编程助手的文字渐显 Skill，提取自 SeismoClick 的报告显示效果。

新生成的文字先很淡，随后逐渐变实；输出速度有快慢和停顿。不是给整段文字加模糊，也不是匀速打字机。

## 里面有什么

- `SKILL.md`：助手如何选择实现、接入和验证效果。
- `assets/TextReveal.vue`：可直接复制的 Vue 3 组件。
- `assets/text-cadence.js`：文字分段与非匀速时间安排。
- `assets/demo.html`：离线可用的效果预览，双击打开即可。
- `agents/openai.yaml`：Codex 的显示名称和示例调用。

## 安装与使用

仓库：[BBmmo-code/ai-text-reveal](https://github.com/BBmmo-code/ai-text-reveal)

把下面这句话发给支持安装 Skill 的编程助手：

> 帮我安装这个 Skill：https://github.com/BBmmo-code/ai-text-reveal 。SKILL.md 在仓库根目录，安装名称用 ai-text-reveal。


将整个 `ai-text-reveal` 文件夹放入 Codex 的 `~/.codex/skills/`。之后在新一轮对话中调用：

> 使用 $ai-text-reveal，给我的聊天回复加上新文字由淡到实、输出快慢交替的效果。

也可以下载仓库 ZIP 后手动安装。只报名字不保证能找到：公开 GitHub 仓库不会自动进入任何工具的精选目录。

其他支持 Agent Skills 格式的工具可按其安装方式使用；目录格式兼容不表示已在所有工具中实测。Vue 参考组件需要 Vue 3，其他框架需要适配。

## 预览与边界

打开 `assets/demo.html`，输入自己的文字后点“重新播放”。这是显示动画，预览不调用大模型、不需要联网。点击“立即完成”可以查看最终文本。

默认每字淡入 1 秒；后台经过的时间也计入进度。真实流式文本和一次性完整文本的接入方式、完成时刻及导出注意事项见 `SKILL.md`。

分享范围仅为显示组件和用法，不含评估算法、业务提示词、用户数据或任何服务密钥。安装 Skill 不会自行修改已有项目；在具体项目中发出接入请求后才进行修改。

## 开源分享

可以把本文件夹作为一个独立 GitHub 仓库，附上预览截图或录屏，再分享仓库链接。Gitee 也可托管同样的文件，但具体助手是否支持从 Gitee 自动安装取决于它的安装工具。

采用 MIT 许可证，保留原项目版权声明，见 `LICENSE`。
