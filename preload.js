const { contextBridge, ipcRenderer } = require('electron');

// 暴露出来给渲染线程的函数
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      let validChannels = ['message-from-renderer-channel'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel, func) => {
      let validChannels = ['message-from-main-channel'];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
      }
    }
  }
});
