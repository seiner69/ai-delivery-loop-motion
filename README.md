# AI Delivery Loop Motion（AI 交付闭环动态短片）

这是一个 30 秒、9:16 的 Remotion 解释动画，主题是如何从模糊提示转向可重复的交付闭环：澄清需求、拆解工作、产出具体结果、验证结果并继续迭代。

全部画面由 React、CSS 和内联 SVG 生成，不包含实拍素材、图片、音频、远程字体、追踪代码或网络 API。

## 主要能力

- 五个连续场景，每个场景 6 秒
- 使用 `interpolate()` 和 `spring()` 实现确定性逐帧动画
- 用代码生成“歧义、封装、交付、验证和迭代”图示
- 1080 × 1920 竖屏输出，30 fps
- 高对比度排版与克制的青色／琥珀色视觉系统

## 前置条件

- Node.js 20+
- npm 10+
- 可用于渲染的 Chromium 兼容环境

## 安装与预览

```bash
npm install
npm run dev
```

打开终端中显示的 Remotion Studio 地址，并选择 `KnowledgeMotion`。

## 验证与渲染

```bash
npm run lint
npm run build
npm run render
npm audit --registry=https://registry.npmjs.org
```

生成的 MP4 位于 `out/ai-delivery-loop.mp4`。媒体输出默认不提交到 Git。安全审计命令显式使用 npm 官方注册表，避免部分镜像站不提供漏洞审计接口。

## 目录结构

```text
src/Composition.tsx  场景数据、动画时间、SVG 图示和字幕
src/Root.tsx         Composition 注册与 9:16 渲染设置
src/index.ts         Remotion 入口
src/index.css        最小全局画布重置
remotion.config.ts   图片格式和覆盖行为
```

## 已知限制

- 旁白以屏幕中文文案呈现，不包含配音或音乐。
- 默认字体优先使用微软雅黑，并回退到通用无衬线字体；不同系统的换行可能不同。
- 场景文案直接写在 `Composition.tsx` 中，没有外部配置或多语言层。
- 本仓库是聚焦单一成片的 Composition，不是通用视频模板引擎。

## 来源

原始 Codex 辅助作品创建于 2026-06-11。本仓库只保留完成的 Composition 和最小构建配置；通用脚手架文档、远程 Logo、未使用的 Tailwind 接入、生成媒体和原始 Git 历史均已排除。

原项目标记为 `UNLICENSED`，本仓库保留该标记，没有新增开源许可证。
