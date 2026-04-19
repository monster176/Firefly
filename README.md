<img src="./docs/images/1131.png" width="405" height="511" alt="Mascot" align="right" />

<div align="center">

# 次元补给ステーション
> Shadow 的个人博客系统（基于 Astro）

</div>

---

[**在线访问**](https://monster176.github.io/Firefly/) /
[**GitHub 仓库**](https://github.com/monster176/Firefly) /
[**作者主页（Bilibili）**](https://space.bilibili.com/3493120197004169)

一个偏二次元风格的个人技术博客，当前主要记录 Qt、OpenCV、网络与工程化学习笔记，也包含番组计划和留言互动等页面。

- 响应式设计：兼容桌面与移动端
- 丰富配置：大部分功能可通过 `src/config/` 自定义
- 动画与主题：支持主题色、壁纸模式、页面过渡等
- 博客能力：Markdown、代码高亮、目录、数学公式、图片灯箱、RSS、Sitemap

<img alt="home" src="./docs/images/1.png" />

<table>
  <tr>
    <td valign="top"><img src="./docs/images/2.png" alt="list view" /></td>
    <td valign="top"><img src="./docs/images/3.png" alt="detail view" /></td>
  </tr>
</table>

## 功能概览

- [x] Astro + Tailwind CSS
- [x] Swup 页面切换动画
- [x] 多语言支持（i18n）
- [x] 全文搜索（Pagefind / MeiliSearch）
- [x] 可切换列表/网格布局
- [x] 评论系统（Twikoo / Waline / Giscus / Disqus）
- [x] 追番与番组计划页面
- [x] 自定义字体、导航栏、侧边栏、页脚和公告

## 本地开发

### 环境要求

- Node.js >= 22
- pnpm >= 9

### 启动步骤

```bash
git clone https://github.com/monster176/Firefly.git
cd Firefly
pnpm install
pnpm dev
```

默认访问地址：`http://localhost:4321`

### 常用命令

```bash
pnpm dev          # 本地开发
pnpm build        # 生产构建
pnpm preview      # 预览构建结果
pnpm new-post xxx # 新建文章模板
```

## 部署说明

推荐使用 GitHub Pages。仓库已包含工作流：推送到 `master` 分支后会自动构建并发布。

如果你使用自定义域名，请同步修改 `astro.config.mjs` 中的 `site` 字段。

## 版权与致谢

本项目为二次开发项目，已保留原开源协议与来源说明。

- 基于 [Firefly](https://github.com/CuteLeaf/Firefly) 二次开发
- Firefly 的上游来源包括：
1. [Fuwari](https://github.com/saicaca/fuwari)
2. [Mizuki](https://github.com/matsuzaka-yuki/Mizuki)
- 技术栈包含 [Astro](https://astro.build) 与 [Tailwind CSS](https://tailwindcss.com)

请在再次分发或商用时保留仓库中的 `LICENSE` 与相关署名信息（MIT License）。

## License

This project is distributed under the MIT License. See [LICENSE](./LICENSE) for details.
