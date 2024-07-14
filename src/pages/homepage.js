import React, { useState } from 'react';
// 官方提供的图标
import { LaptopOutlined, NotificationOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import InputBox from '../component/comunication';

const { Header, Content, Sider } = Layout;
// map 函数遍历数组中的每个元素; 对于每个元素 (key)，它创建一个新的对象，
const nav_items = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const sub_items = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const Homepage = () => {
    // 假设 nav_items 和 sub_items 已经定义并且可以正常使用
    const [selectedNavContent, setSelectedNavContent] = useState(nav_items[0]); // 1. 设置状态来存储选中的内容
    const [selectedSubContent, setSelectedSubContent] = useState({ parent: sub_items[0], child: sub_items[0].children[0] }); // 1. 设置状态来存储选中的内容
    const handleNavMenuClick = (e) => {
        const { key, } = e;
        const item = nav_items.find(item => item.key == key);
        setSelectedNavContent(item);
    };
    const handleSubMenuClick = (e) => {
        const { keyPath } = e;

        const sub1 = sub_items.find(item => item.key === keyPath[1]);
        const sub2 = sub1.children.find(child => child.key == keyPath[0]);

        // 2. 点击菜单项时更新选中的内容
        setSelectedSubContent({ parent: sub1, child: sub2 });


    };
    const navigate = useNavigate();
    const handleSettingsClick = () => {
        navigate('/setting');
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            {/* 最上方的导航框 */}
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    onClick={handleNavMenuClick} // 添加点击事件处理程序
                    items={nav_items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
                <Content style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                    Your HomePage
                </Content>
                <Button icon={<SettingOutlined />} shape="circle" onClick={handleSettingsClick} />
            </Header>

            <Layout>
                {/* 左边导航栏 */}
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={sub_items}
                        onClick={handleSubMenuClick} // 添加点击事件处理程序
                    />
                </Sider>
                {/* 右边 content */}
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    {/* 面包屑 */}
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>{selectedNavContent.label}</Breadcrumb.Item>
                        <Breadcrumb.Item>{selectedSubContent.parent.label}</Breadcrumb.Item>
                        <Breadcrumb.Item>{selectedSubContent.child.label}</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* 内容 */}
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {`${selectedNavContent.label}` === "nav 1" &&
                            `${selectedSubContent.parent.label}` === "subnav 1"
                            && `${selectedSubContent.child.label}` === "option1" ? (
                            <div>
                                {/* 特定组件和内容 */}
                                <h1>Specific Component</h1>
                                <InputBox></InputBox>
                            </div>
                        ) : (
                            <div>
                                {selectedNavContent && `nav Content for ${selectedNavContent.label}`}
                                <br />
                                {selectedSubContent && (
                                    <>
                                        {`sub Content for ${selectedSubContent.parent.label}`}
                                        {` - sub child Content for ${selectedSubContent.child.label}`}
                                        <br />
                                        {<Link to="/index">Go to Another Page</Link>}
                                    </>
                                )}
                            </div>
                        )}

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default Homepage;