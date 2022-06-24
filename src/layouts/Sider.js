import React from "react";
import "../assets/styles/layouts/Sider.css";
import { Menu, Space } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Constants } from "../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setSideMenu } from "../store/reducers/menu";

// 보조메뉴 현시부분
function Sider() {
  const { headerMenu, siderMenu, siderMenuRole } = useSelector((state) => ({
    headerMenu: state.menu.headerMenu,
    siderMenu: state.menu.siderMenu,
    siderMenuRole: state.role.siderMenuRole,
  }));

  const dispatch = useDispatch();

  const onMenuClick = (key) => {
    dispatch(setSideMenu(key));
  };

  return (
    <>
      <Space className="logo" size={9}>
        <img src={logo} width="30px" height="30px" />
        <label className="logo-title">자동차 서비스 통합 관리자</label>
      </Space>
      <Menu
        className="sider-menu-layout"
        theme="light"
        mode="inline"
        defaultSelectedKeys={[siderMenu.key]}
        selectedKeys={[siderMenu.key]}
        onClick={(key) => onMenuClick(key.key)}
      >
        {Constants.siderMenus
          .filter(
            (siderMenuItem) => siderMenuItem.headerMenu === headerMenu.key
          )
          .map((item, index) =>
            siderMenuRole[headerMenu.key] ? (
              siderMenuRole[headerMenu.key][index] !== 0 ? (
                <Menu.Item key={index}>
                  <Link to={item.link}>{item.label}</Link>
                </Menu.Item>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          )}
      </Menu>
    </>
  );
}

export default Sider;
