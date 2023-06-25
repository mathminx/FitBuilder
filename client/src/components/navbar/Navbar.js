import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { LoginModal, SignupModal } from "./LoginSignup";

const SimpleNavbar = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  const showLoginModal = () => {
    setLoginVisible(true);
  };

  const showSignupModal = () => {
    setSignupVisible(true);
  };

  const hideLoginModal = () => {
    setLoginVisible(false);
  };

  const hideSignupModal = () => {
    setSignupVisible(false);
  };

  return (
   <>
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />} onClick={showLoginModal}>
        Login
      </Menu.Item>
      <Menu.Item key="signup" icon={<UserAddOutlined />} onClick={showSignupModal}>
        Signup
      </Menu.Item>
       </Menu>
      <LoginModal visible={loginVisible} handleOk={hideLoginModal} handleCancel={hideLoginModal} />
      <SignupModal visible={signupVisible} handleOk={hideSignupModal} handleCancel={hideSignupModal} />
   </>
  );
};

export default SimpleNavbar;
