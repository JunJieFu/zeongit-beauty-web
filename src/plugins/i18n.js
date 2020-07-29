import VueI18n from "vue-i18n"
import Vue from "vue"
Vue.use(VueI18n)
const messages = {
  zhHans: {
    $vuetify: {
      menu: {
        home: "首页",
        find: "猜你喜欢",
        new: "本站最新",
        followingNew: "关注最新",
        collection: "收藏",
        works: "作品",
        footprint: "足迹",
        follower: "粉丝",
        following: "关注",
        upload: "上传"
      },
      signInTip: {
        title: {
          user: "您的Zeongit Beauty主页",
          followingNew: "您关注用户的最新作品",
          collection: "您喜爱的作品",
          works: "您发表过的点点滴滴",
          footprint: "追寻您查走过的足迹",
          follower: "喜欢您的作品的人",
          following: "ta的作品吸引了你",
          upload: "您有新的作品",
          collectBtn: "喜欢这张绘画？",
          followBtn: "想要关注这个画师？",
          moreBtn: "需要更多操作？"
        },
        text: {
          user: "请先登录，才能进入您的Zeongit Beauty主页。",
          followingNew: "请先登录，才能查看到您关注用户的最新作品。",
          collection: "请先登录，才能查看到您收藏的作品。",
          works: "请先登录，才能查看到您上传的作品。",
          footprint: "请先登录，才能查看到您走过的足迹。",
          follower: "请先登录，才能查看到您的粉丝。",
          following: "请先登录，才能查看到您的关注。",
          upload: "请先登录，才能让别人欣赏到你的新作品。",
          collectBtn: "请先登录，然后才能把这张绘画添加到收藏夹。",
          followBtn: "请先登录，然后才能成为该画师的粉丝。",
          moreBtn: "请先登录，才能获得更多操作。"
        },
        signIn: "登录"
      },
      emptyTip: {
        title: {
          find: "什么作品都没有",
          new: "什么作品都没有",
          search: "什么都搜不到哦",
          followingNew: "没有作品",
          collection: "没有作品",
          works: "没有作品",
          footprint: "没有作品",
          pictureFootprint: "图片没有任何足迹",
          pictureCollection: "图片没有任何收藏",
          follower: "没有粉丝",
          following: "没有关注"
        },
        text: {
          find: "难道是系统出现什么问题了。",
          new: "难道是系统出现什么问题了。",
          search: "您可以再换一些标签搜索哦。",
          followingNew: "您可以前往发现浏览一些系统推荐给您的作品哦。",
          collection: "您可以前往发现浏览一些系统推荐给您的作品哦。",
          works: "可以上传一些作品到我们哦。",
          footprint: "观赏过的作品我们都会有所记录。",
          pictureFootprint: "您可以成为第一个留下脚印的人。",
          pictureCollection: "您可以成为第一个收藏的人。"
        },
        btnDesc: {
          find: "我要反馈",
          new: "我要反馈",
          followingNew: "前往发现",
          collection: "前往发现",
          works: "我要上传",
          footprint: "前往发现",
          pictureFootprint: "留下脚印",
          pictureCollection: "前往收藏"
        }
      }
    }
  },
  jp: {
    $vuetify: {
      menu: {
        home: "最初のページ",
        find: "おすすめ",
        new: "この駅の最新",
        followingNew: "注目の最新",
        collection: "コレクション",
        works: "作品",
        footprint: "足跡",
        follower: "ファン",
        following: "関心を持つ",
        upload: "アップロード"
      },
      signInTip: {
        title: {
          user: "あなたのZeongit Beautyホームページ",
          followingNew: "ユーザーの最新作に注目しています",
          collection: "お気に入りの作品",
          works: "発表したことがあります。",
          footprint: "あなたの歩いた足跡を探します",
          follower: "あなたの作品が好きな人",
          following: "彼の作品はあなたを引きつけました",
          upload: "あなたは新しい作品を持っています"
        },
        text: {
          user:
            "まず登録してください。あなたのZeongit Beautyホームページに入ることができます。",
          followingNew:
            "まず登録してください。お客様の最新の作品を見ることができます。",
          collection: "先に登録してください。お気に入りの作品が確認できます。",
          works: "先に登録してください。アップロードされた作品を確認できます。",
          footprint: "先に登録してください。あなたが歩いてきた足跡が見えます。",
          follower: "まず登録してください。ファンを確認することができます。",
          following: "まず登録してください。あなたの関心が見えます。",
          upload: "まず登録してください。他の人に新しい作品を見られます。。"
        },
        signIn: "ログイン"
      }
    }
  }
}
export default new VueI18n({
  locale: "zhHans", // set locale
  messages, // set locale messages
  silentTranslationWarn: true
})
