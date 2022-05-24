import React from "react";
import "../assets/styles/layouts/Sider.css";
import { Menu, Space } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Constants } from "../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setSideMenu } from "../store/reducers/menu";

function Sider() {
  const { headerMenu } = useSelector((state) => ({
    headerMenu: state.menu.headerMenu,
  }));

  const { sideMenu } = useSelector((state) => ({
    sideMenu: state.menu.sideMenu,
  }));

  const dispatch = useDispatch();

  const onMenuClick = (key) => {
    dispatch(setSideMenu(key));
  };

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
        defaultSelectedKeys={[sideMenu.key]}
        selectedKeys={[sideMenu.key]}
        onClick={(key) => onMenuClick(key.key)}
      >
        {Constants.siderMenus
          .filter((sideMenu) => sideMenu.headerMenu === headerMenu.key)
          .map((item, index) => (
            <Menu.Item key={index}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
      </Menu>
    </>
  );
}

export default Sider;
