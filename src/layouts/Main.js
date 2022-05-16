import React from 'react';
import '../assets/styles/layouts/Main.css'
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderContent from './Header';
import SiderContent from './Sider';

const { Header, Content, Sider } = Layout;

function Main({ headerMenuKey, removeToken }) {
	return (
		<Layout className='main-layout'>
			<Sider width='auto' theme='light'>
				<SiderContent headerMenuKey={headerMenuKey} />
			</Sider>
			<Layout className="site-layout">
				<Header className='header-layout'>
					<HeaderContent removeToken={() => removeToken()} />
				</Header>
				<Content className="content-layout">
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}

export default Main;