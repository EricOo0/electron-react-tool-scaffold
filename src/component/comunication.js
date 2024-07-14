import React, { useState } from 'react';
import { Input, notification, Button } from 'antd';



const { TextArea } = Input;
notification.config({
    maxCount: 1,
})


const InputBox = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement, msg) => {
        // 打开新通知并获取其 key
        notification.open({
            message: `Notification ${placement}`,
            description: msg,
            placement,
        });

    };
    // 监听主进程的回复
    window.electron.ipcRenderer.on('message-from-main-channel', (event, message) => {
        console.log(`Received message from main process: ${message}`)
        openNotification('top', message)
        localStorage.setItem("cookie", message)

    });
    const [text1, setText1] = useState(''); // 状态用于存储TextArea 的内容

    const sendMessageToMainProcess = () => {
        // 向 Electron 主进程发送 IPC 消息

        window.electron.ipcRenderer.send('message-from-renderer-channel', `${text1}`);
    };

    return (
        <>
            {contextHolder}
            <TextArea rows={4} value={text1} onChange={(e) => setText1(e.target.value)} placeholder="maxLength is 6" maxLength={6} />
            <br />
            <br />
            <Button onClick={sendMessageToMainProcess}>Send Message to Main Process</Button>
            <Button onClick={() => openNotification('top', 'This is a test notification')}>Test Notification</Button>

        </>
    );
};
export default InputBox;
