import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
  title: "公告", // 公告标题
  content: "欢迎来到次元专属小天地！这里会持续更新番剧推荐、角色解析、同人创作与二次元杂谈～ 评论区开放唠嗑、求番、交友，禁止引战、刷屏和无关广告，一起守护干净又热闹的次元空间呀", // 公告内容
  closable: true, // 允许用户关闭公告
  link: {
    enable: true, // 启用链接
    text: "了解更多", // 链接文本
    url: "/about/", // 链接 URL
    external: false, // 内部链接
  },
};
