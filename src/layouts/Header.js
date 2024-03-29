import React, { useEffect } from "react";
import "../assets/styles/layouts/Header.css";
import { Menu, Space, Divider, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import setting_icon from "../assets/images/setting-icon.png";
import { Constants } from "../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../store/reducers/auth";
import { init, setHeaderMenu, setSideMenu } from "../store/reducers/menu";
import { init as roleInit } from "../store/reducers/role";

// 기본메뉴 현시부분
function Header() {
  const { token, headerMenu, headerMenuRole, siderMenuRole } = useSelector(
    (state) => ({
      token: state.auth.token,
      headerMenu: state.menu.headerMenu,
      headerMenuRole: state.role.headerMenuRole,
      siderMenuRole: state.role.siderMenuRole,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roleInit());
    dispatch(init());
  }, [dispatch]);

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
            (headerMenuRole[item.key] &&
              siderMenuRole[item.key].some((item) => item !== 0)) ||
            item.key === "finance" ? (
              <Menu.Item key={item.key} disabled={item.key === "finance"}>
                <Link
                  to={
                    siderMenuRole[item.key].some((sideItem) => sideItem !== 0)
                      ? Constants.siderMenus.filter(
                          (sideItem) => sideItem.headerMenu === item.key
                        )[
                          siderMenuRole[item.key].findIndex(
                            (sideItem) => sideItem !== 0
                          )
                        ].link
                      : "/no-access"
                  }
                >
                  {item.label}
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )
          )}
        </Menu>
      </Col>
      <Col flex="auto"></Col>
      <Col>
        <Space align="center" size={0}>
          <Link to={"/user/mine/1"} onClick={onUserClick}>
            <Button className="top-menu-user" type="link" block>
              {token.name}님
            </Button>
          </Link>
          {token.idx === 1 ? (
            <Link to={"/user/mine/1"} onClick={onSettingClick}>
              <img className="top-menu-setting" src={setting_icon} />
            </Link>
          ) : (
            ""
          )}
          <Divider className="top-menu-divider" type="vertical" />
          <a href="#" className="top-menu-logout" onClick={onLogoutClick}>
            로그아웃
          </a>
        </Space>
      </Col>
    </Row>
  );
}

export default Header;
