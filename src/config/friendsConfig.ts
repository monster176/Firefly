import type { FriendLink } from "../types/config";

// 鍙互鍦╯rc/content/spec/friends.md涓紪鍐欏弸閾鹃〉闈笅鏂圭殑鑷畾涔夊唴瀹?

// 鍙嬮摼閰嶇疆
export const friendsConfig: FriendLink[] = [
  {
    title: "reschen",
    imgurl:
      "https://blog.reschen.cn:888/upload/6421ea0c-1c5e-47bb-966f-546a84888804.png",
    desc: "鏄ユ棩鎵嶇湅鏉ㄦ煶缁匡紝绉嬮鍙堣鑿婅姳榛?,
    siteurl: "https://blog.reschen.cn:888/",
    tags: ["Blog"],
    weight: 10, // 鏉冮噸锛屾暟瀛楄秺澶ф帓搴忚秺闈犲墠
    enabled: true, // 鏄惁鍚敤
  },
  {
    title: "nomo",
    imgurl:
      "https://blog.nomo.run/upload/2024/01/Toss.png",
    desc: "澶墰閫间簡浠€涔堥兘娌＄暀涓?,
    siteurl: "https://blog.nomo.run/",
    tags: ["Blog"],
    weight: 9, // 鏉冮噸锛屾暟瀛楄秺澶ф帓搴忚秺闈犲墠
    enabled: true, // 鏄惁鍚敤
  },
  {
    title: "AI鍒涙柊绀?,
    imgurl:
      "https://blog.elsworld.cn:8443/upload/AI%E5%88%9B%E6%96%B0%E7%A4%BE-logo.png",
    desc: "鐢ㄥ垱閫犲姏瑙ｇ爜鏅鸿兘鏂扮邯鍏?,
    siteurl: "https://www.aicx.qzz.io/",
    tags: ["Blog"],
    weight: 9, // 鏉冮噸锛屾暟瀛楄秺澶ф帓搴忚秺闈犲墠
    enabled: true, // 鏄惁鍚敤
  },
  {
    title: "缃戝畨闈跺満",
    imgurl:
      "/assets/images/ctf.webp",
    desc: "",
    siteurl: "http://134.175.73.219/",
    tags: ["Blog"],
    weight: 9, // 鏉冮噸锛屾暟瀛楄秺澶ф帓搴忚秺闈犲墠
    enabled: true, // 鏄惁鍚敤
  },
  {
    title: "Lixiney",
    imgurl:
      "https://blog.lixey.top/img/favicon.png",
    desc: "甯稿簲甯搁潤锛岀湡甯稿簲鐗┿€傜湡甯稿緱鎬э紝甯告竻闈欑煟銆?,
    siteurl: "https://blog.lixey.top/",
    tags: ["Blog"],
    weight: 9, // 鏉冮噸锛屾暟瀛楄秺澶ф帓搴忚秺闈犲墠
    enabled: true, // 鏄惁鍚敤
  },
  {
    title: "Kaner's Blog",
    imgurl:
      "https://blog.kanerel.cn:888/upload/07280943981748968be9a9166617eb5d_1.png",
    desc: "orz姣忎竴澶?,
    siteurl: "https://blog.kanerel.cn:888/",
    tags: ["Blog"],
    weight: 9, // 鏉冮噸锛屾暟瀛楄秺澶ф帓搴忚秺闈犲墠
    enabled: true, // 鏄惁鍚敤
  },
  {
    title: "71so 鐨勭绉橀笩绐?,
    imgurl:
      "/assets/images/71so.png",
    desc: "After Futurehttp://blog.afterfuture.xyz",
    siteurl: "http://115.120.246.203:8090/",
    tags: ["Blog"],
    weight: 9, // 鏉冮噸锛屾暟瀛楄秺澶ф帓搴忚秺闈犲墠
    enabled: true, // 鏄惁鍚敤
  },
  {
    title: "TH 銇褰?,
    imgurl: "https://ts2.tc.mm.bing.net/th/id/OIP-C.dosIr_x-nV6SMw8sD6Q0hQHaNE",
    desc: "涓嶅€间竴鎻愮殑灏忚彍",
    siteurl: "https://blog.t6zzq.xyz/",
    tags: ["Blog"],
    weight: 9,
    enabled: true,
  },
  {
    title: "HXLoLi",
    imgurl: "https://avatars.githubusercontent.com/u/103022267",
    desc: "ここから先は一方通行だ!",
    siteurl: "https://hengxin666.github.io/HXLoLi/",
    tags: ["Blog"],
    weight: 9,
    enabled: true,
  },
];

// 鑾峰彇鍚敤鐨勫弸閾惧苟鎸夋潈閲嶆帓搴?
export const getEnabledFriends = (): FriendLink[] => {
  return friendsConfig
    .filter((friend) => friend.enabled)
    .sort((a, b) => b.weight - a.weight); // 鎸夋潈閲嶉檷搴忔帓搴?
};



