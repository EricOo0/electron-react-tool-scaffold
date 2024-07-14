本工程提供一个简单上手的 工具客户端 脚手架，可以帮助用户快速为自己的工具搭建一个可视化客户端页面。

基于react 搭建项目工程，用于构建客户端UI (渲染线程)

入口设置为electron (主线程)

package.json
- 配置入口为main.js，绘制了一个主窗口，加载react build出来的页面
- 使用组件均基于antd
  # 技术栈
  - electron
  - react


# 使用方式
1. 开箱即用
   > 拉取本项目后，可直接运行
   > npm run electron-start 
2. 修改UI
   > 和 开发 react 流程一样，修改src文件夹下页面和样式
3. 根目录下
    > npm run build
4. 重新运行
    > npm run electron-start
5. 打包应用
   > electron-packager ./ app --platform=darwin --out=./dist --arch=arm64 --app-version=1.0.0 --icon=./image/icon.ico --overwite

    >electron-packager ./ app --platform=win32 --out=./dist --arch=x64 --app-version=1.0.0 --icon=./image/icon.ico --overwite

    > 可能需要 安装 
    npm install electron-packager -g
    npm install -g electron-prebuilt
6. 打包后的应用在dist文件夹下，可以直接运行，需要根据不同平台进行交叉编译