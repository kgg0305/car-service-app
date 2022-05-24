import React from "react";
import "../assets/styles/layouts/Sider.css";
import { Menu, Space } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Constants } from "../constants/Constants";

function GetSiderMenus(headerMenuKey) {
  return Constants.siderMenus.filter(
    (item) => item.headerMenu === headerMenuKey
  );
}

function Sider({ headerMenuKey }) {
  return (
    <>
      <Space className="logo" size={15}>
        <img src={logo} />
        <label className="logo-title">자동차 서비스 통합 관리자</label>
      </Space>
      <Menu
        className="sider-menu-layout"
        theme="light"
        mode="inline"
        defaultSelectedKeys={["0"]}
      >
        {GetSiderMenus(headerMenuKey).map((item, index) => (
          <Menu.Item key={index}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}

export default Sider;
