import React from "react";
import '../assets/styles/layouts/Header.css'
import { Menu, Space, Divider, Row, Col } from "antd";
import { Link } from 'react-router-dom';
import setting_icon from '../assets/images/setting-icon.png'

function Header() {
    return(
        <Row justify="middle">
            <Col style={{ height: 80 }}>
                <Menu className="top-menu-layout" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/car/brand">자동차 DB</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/blogs">금융견적 DB</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/blogs">견적 관리</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/blogs">콘텐츠 관리</Link>
                    </Menu.Item>
                </Menu>
            </Col>
            <Col flex="auto"></Col>
            <Col>
                <Space align="center">
                    <label className ="top-menu-user">[사용자이름]님</label>
                    <a>
                        <img src={setting_icon} />
                    </a>
                    <Divider className="top-menu-divider" type="vertical" />
                    <a className="top-menu-logout">로그아웃</a>
                </Space>
            </Col>
        </Row>
    );
}

export default Header;