import React from "react";
import '../assets/styles/layouts/Sider.css'
import { Menu, Space } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'

function Sider() {
    return(
        <>
            <Space className="logo" size={15}>
                <img src={logo} />
                <label className="logo-title">자동차 서비스 통합 관리자</label>
            </Space>
            <Menu className="sider-menu-layout" theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/car/brand">브랜드</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/">모델 그룹</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/">모델</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/">라인업</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/">트림</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to="/">할인/비용</Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to="/">취득세/공채/탁송</Link>
                </Menu.Item>
            </Menu>
        </>
    );
}

export default Sider;