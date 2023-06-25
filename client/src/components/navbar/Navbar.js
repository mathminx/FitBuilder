import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const SimpleNavbar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        Login
      </Menu.Item>
      <Menu.Item key="signup" icon={<UserAddOutlined />}>
        Signup
      </Menu.Item>
    </Menu>
  );
};

export default SimpleNavbar;
