import React from "react";
import "../assets/styles/layouts/Header.css";
import { Menu, Space, Divider, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import setting_icon from "../assets/images/setting-icon.png";
import { Constants } from "../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/reducers/auth";
import { setHeaderMenu, setSideMenu } from "../store/reducers/menu";

function Header() {
  const { token, headerMenu, roleList } = useSelector((state) => ({
    token: state.auth.token,
    headerMenu: state.menu.headerMenu,
    roleList: state.menu.roleList,
  }));

  const dispatch = useDispatch();

  const onLogoutClick = () => dispatch(removeToken());
  const onMenuClick = (key) => {
    dispatch(setHeaderMenu(key));
  };

  const onUserClick = () => {
    dispatch(setHeaderMenu("user"));
    dispatch(setSideMenu("mine"));
  };

  const onSettingClick = () => {
    dispatch(setHeaderMenu("user"));
  };

  return (
    <Row justify="middle">
      <Col flex="auto" style={{ height: 80 }}>
        <Menu
          className="top-menu-layout"
          mode="horizontal"
          defaultSelectedKeys={[headerMenu.key]}
          selectedKeys={[headerMenu.key]}
          onClick={(key) => onMenuClick(key.key)}
        >
          {Constants.headerMenus.map((item) =>
            roleList.some(
              (roleItem) =>
                roleItem.name === item.key ||
                ((roleItem.name === "content1" ||
                  roleItem.name === "content2") &&
                  item.key === "content")
            ) || token.idx === 1 ? (
              <Menu.Item key={item.key}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ) : (
              <></>
            )
          )}
        </Menu>
      </Col>
      <Col flex="auto"></Col>
      <Col>
        <Space align="center">
          <Link to={"/user/mine/1"} onClick={onUserClick}>
            <Button className="top-menu-user" type="link" block>
              {token.name}님
            </Button>
          </Link>
          {token.idx === 1 ? (
            <Link to={"/user/mine/1"} onClick={onSettingClick}>
              <img src={setting_icon} />
            </Link>
          ) : (
            ""
          )}
          <Divider className="top-menu-divider" type="vertical" />
          <a href="/" className="top-menu-logout" onClick={onLogoutClick}>
            로그아웃
          </a>
        </Space>
      </Col>
    </Row>
  );
}

export default Header;
