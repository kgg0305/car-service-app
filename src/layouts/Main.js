import React from "react";
import "../assets/styles/layouts/Main.css";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderContent from "./Header";
import SiderContent from "./Sider";

const { Header, Content, Sider } = Layout;

// 페지 현시부분
function Main() {
  return (
    <Layout className="main-layout">
      <Sider width="300px" theme="light">
        <SiderContent />
      </Sider>
      <Layout className="site-layout">
        <Header className="header-layout">
          <HeaderContent />
        </Header>
        <Content className="content-layout">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
