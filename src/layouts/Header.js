import React from "react";
import '../assets/styles/layouts/Header.css'
import { Menu, Space, Divider, Row, Col, Button } from "antd";
import { Link } from 'react-router-dom';
import setting_icon from '../assets/images/setting-icon.png'
import { Constants } from '../constants/Constants';
import useToken from "../data/useToken";

function Header() {
    const { token, removeToken } = useToken();

    const onLogoutClick = () => {
        removeToken();
    };

    return(
        <Row justify="middle">
            <Col flex="auto" style={{ height: 80 }}>
                <Menu className="top-menu-layout" mode="horizontal" defaultSelectedKeys={['0']}>
                    {
                        Constants.headerMenus.map((item, index) => (
                            <Menu.Item key={ index }>
                                <Link to={ item.link }>{ item.label }</Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Col>
            <Col flex="auto"></Col>
            <Col>
                <Space align="center">
                    <Link to={'/user/mine/1'}>
                        <Button className ="top-menu-user" type="link" block>
                        {token.name}님
                        </Button>
                    </Link>
                    <Link to={'/user/mine/1'}>
                        <img src={setting_icon} />
                    </Link>
                    <Divider className="top-menu-divider" type="vertical" />
                    <a href="/" className="top-menu-logout" onClick={onLogoutClick}>로그아웃</a>
                </Space>
            </Col>
        </Row>
    );
}

export default Header;