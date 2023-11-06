import React, { useState } from 'react';
import './index.css';
import {
    BulbOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import UserListView from './UserListView';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Users', '1', <TeamOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('About', '9', <BulbOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ paddingLeft: 10, background: colorBgContainer }}>
                    <h2 style={{ margin: 0, padding: 0 }}>
                        User Management Portal
                    </h2>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                   <UserListView />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©️2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default App;