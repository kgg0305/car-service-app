import React from "react";
import "../assets/styles/layouts/Sider.css";
import { Menu, Space } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Constants } from "../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setSideMenu } from "../store/reducers/menu";

function Sider() {
  const { headerMenu, sideMenu, sideMenuRole } = useSelector((state) => ({
    headerMenu: state.menu.headerMenu,
    sideMenu: state.menu.sideMenu,
    sideMenuRole: state.menu.sideMenuRole,
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
        defaultSelectedKeys={[sideMenu.key]}
        selectedKeys={[sideMenu.key]}
        onClick={(key) => onMenuClick(key.key)}
      >
        {Constants.siderMenus
          .filter((sideMenuItem) => sideMenuItem.headerMenu === headerMenu.key)
          .map((item, index) =>
            sideMenuRole[headerMenu.key] ? (
              sideMenuRole[headerMenu.key][index] === 1 ||
              sideMenuRole[headerMenu.key][index] === 2 ? (
                <Menu.Item
                  key={index}
                  disabled={
                    sideMenuRole[headerMenu.key]
                      ? sideMenuRole[headerMenu.key][index] === 2
                      : false
                  }
                >
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
