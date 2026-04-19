import type { FriendLink } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链配置
export const friendsConfig: FriendLink[] = [
  {
    title: "reschen",
    imgurl:
      "https://blog.reschen.cn:888/upload/6421ea0c-1c5e-47bb-966f-546a84888804.png",
    desc: "春日才看杨柳绿，秋风又见菊花黄",
    siteurl: "https://blog.reschen.cn:888/",
    tags: ["Blog"],
    weight: 10, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "nomo",
    imgurl:
      "https://blog.nomo.run/upload/2024/01/Toss.png",
    desc: "太牛逼了什么都没留下",
    siteurl: "https://blog.nomo.run/",
    tags: ["Blog"],
    weight: 9, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "AI创新社",
    imgurl:
      "https://blog.elsworld.cn:8443/upload/AI%E5%88%9B%E6%96%B0%E7%A4%BE-logo.png",
    desc: "用创造力解码智能新纪元",
    siteurl: "https://www.aicx.qzz.io/",
    tags: ["Blog"],
    weight: 9, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "网安靶场",
    imgurl:
      "/assets/images/ctf.webp",
    desc: "",
    siteurl: "http://134.175.73.219/",
    tags: ["Blog"],
    weight: 9, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "Lixiney",
    imgurl:
      "https://blog.lixey.top/img/favicon.png",
    desc: "常应常静，真常应物。真常得性，常清静矣。",
    siteurl: "https://blog.lixey.top/",
    tags: ["Blog"],
    weight: 9, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "Kaner's Blog",
    imgurl:
      "https://blog.kanerel.cn:888/upload/07280943981748968be9a9166617eb5d_1.png",
    desc: "orz每一天",
    siteurl: "https://blog.kanerel.cn:888/",
    tags: ["Blog"],
    weight: 9, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "71so 的神秘鸟窝",
    imgurl:
      "/assets/images/71so.png",
    desc: "After Futurehttp://blog.afterfuture.xyz",
    siteurl: "http://115.120.246.203:8090/",
    tags: ["Blog"],
    weight: 9, // 权重，数字越大排序越靠前
    enabled: true, // 是否启用
  },
  {
    title: "TH の记录",
    imgurl: "https://ts2.tc.mm.bing.net/th/id/OIP-C.dosIr_x-nV6SMw8sD6Q0hQHaNE",
    desc: "不值一提的小菜",
    siteurl: "https://blog.t6zzq.xyz/",
    tags: ["Blog"],
    weight: 9,
    enabled: true,
  },
];

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
  return friendsConfig
    .filter((friend) => friend.enabled)
    .sort((a, b) => b.weight - a.weight); // 按权重降序排序
};
