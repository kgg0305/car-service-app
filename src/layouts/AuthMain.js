import React from 'react';
import '../assets/styles/layouts/Main.css'
import { Layout, Space } from 'antd';
import logo from '../assets/images/logo.png';

const { Header, Content } = Layout;

function AuthMain({ children }) {
	return (
		<Layout className='main-layout'>
			<Layout className="site-layout">
				<Header className='header-layout'>
                    <Space className="simple-logo" size={15}>
                        <img src={logo} />
                        <label className="simple-logo-title">자동차 서비스 통합 관리자</label>
                    </Space>
				</Header>
				<Content className="content-auth-layout">
					{ children }
				</Content>
			</Layout>
		</Layout>
	);
}

export default AuthMain;