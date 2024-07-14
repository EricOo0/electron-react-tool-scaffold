import logo from '../logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Descriptions, theme } from 'antd';
import './logo.css';

const { Header, Content, Sider, Footer } = Layout;
;
const items = [
    {
        key: '1',
        label: 'UserName',
        children: 'Zhou Maomao',
    },
    {
        key: '2',
        label: 'Telephone',
        children: '1810000000',
    },
    {
        key: '3',
        label: 'Live',
        children: 'Hangzhou, Zhejiang',
    },
    {
        key: '4',
        label: 'Remark',
        children: 'empty',
    },
    {
        key: '5',
        label: 'Address',
        children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
];


function Setting() {
    const navigate = useNavigate();
    const handleReturnClick = () => {
        navigate('/');
    };
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
                <Content style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                }}>
                    Seting
                </Content>
            </Header>

            <Layout style={{
                padding: '0 24px 24px',
            }}
            >
                <Sider
                    width={200}
                    style={{
                        background: "white",
                    }}>

                </Sider>

                <Content style={{ padding: '24px', background: '#fff', minHeight: '580px' }}>
                    <Descriptions title="User Info" items={items} />
                </Content>
            </Layout>
            <Footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleReturnClick}>
                    return
                </Button>
            </Footer>
        </Layout>

    );
}

export default Setting;
