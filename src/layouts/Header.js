import React from "react";
import '../assets/styles/layouts/Header.css'
import { Menu, Space, Divider, Row, Col, Button } from "antd";
import { Link } from 'react-router-dom';
import setting_icon from '../assets/images/setting-icon.png'
import { Constants } from '../constants/Constants';

function Header() {
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
                            [사용자이름]님
                        </Button>
                    </Link>
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