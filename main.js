// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const url = require('url')

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow() {
    //创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        maximizable: true,
        minimizable: true,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // 设置预加载脚本的路径
            contextIsolation: true, // 启用上下文隔离
            enableRemoteModule: false, // 禁用远程模块
            nodeIntegration: true, // 禁用节点集成
        },
        title: "我的工具"
    })
    mainWindow.maximize(); // 窗口最大化
    // 加载应用
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'build', 'index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );
    // 在主进程中显示 alert 弹框的示例函数
    function showAlert(msg) {
        const options = {
            type: 'info',
            title: 'Information',
            message: `Receive msg from react process.msg=[${msg}]`,
            buttons: ['OK']
        };

        dialog.showMessageBox(mainWindow, options);
    }
    // 主线程 和 渲染进程通信，可以通过preload.js 暴露方法进行通信
    // 监听渲染进程的消息
    ipcMain.on('message-from-renderer-channel', (event, arg) => {

        console.log("event,arg:", event, arg); // 打印渲染进程发送的数据
        showAlert(arg)
        // 可以将数据发送回渲染进程
        event.reply('message-from-main-channel', `message-from-main-body: receive:${arg}`);
    });
    // mainWindow.webContents.openDevTools();


}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow()
    }
})

// 你可以在这个脚本中续写或者使用require引入独立的js文件. 
