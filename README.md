# Vue版QQ音乐

> 音乐API来自[Binaryify/NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi),非常感谢！

> [预览地址]()

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## 技术栈

- vue2：基础框架
- vue-router2：路由跳转
- vuex：全局数据管理
- es6：采用部分es6特性，大大简化了写法
- webpack：vue-cli基于webpack，修改了部分配置
- axios：基于Promise的http库，用来请求数据
- flex：弹性布局，在移动端兼容性较好，写各种布局非常方便

## 实现功能

- [x] 首页歌单推荐
- [x] 歌单详情
- [x] 播放器
- [x] 播放暂停
- [x] 播放模式切歌
- [ ] 循环模式和随机模式
- [x] 歌词滚动
- [x] 歌曲拖动
- [x] 播放器底部背景
- [ ] 底栏歌词同步
- [x] 播放列表
- [ ] 搜索功能

## 项目结构

```bash

├── build                    // 构建服务和webpack配置
├── config            		 // 项目不同环境的配置
├── dist               		 // 项目build目录
├── index.html          	 // 项目入口文件
├── package.json      		 // 项目配置文件
├── static       			 // 放置静态资源
├── src                		 // 生产目录
│   ├── common          	 // 公共的js,fonts资源,以及可以复用的公共组件，如Loading等
│   ├── components     		 // 各业务组件
│   ├── store          	     // vuex状态管理器
│   ├── App.vue         	 // 主页面
│   ├── router    		     // 路由配置
│   └── main.js       	     // Webpack 预编译入口

```

## 部分截图

[推荐页](./prev/1.gif)
[歌单详情](./prev/2.gif)
[歌手列表](./prev/3.gif)
[播放器页面](./prev/4.gif)

## 最后
项目最难处理的无疑是vuex的数据管理了，使用vuex需要你对整个的业务逻辑了然于胸才行，在一开始思路清晰非常重要，否则后面不停地修补就会非常烦人。在整个的项目过程中我用到了三个包，better-scroll，lyric-parser和vue-lazyload，其余的组件全部是自己手写的，自己封装了loading，swiper轮播，listview等组件，我觉得在代码复用上我有了很大的认识和进步。
项目用到了vue全家桶，尤其是对vue单文件组件，vue-router和vuex的使用，可以有一个很快速的认识和掌握，想要学习Vue.js的小伙伴可以把代码拉过去看看，希望我们一起讨论进步！ :)
