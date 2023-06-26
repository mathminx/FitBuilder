import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { LoginModal, SignupModal } from "./LoginSignup";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { Alert, Space } from "antd";

const WarningComponent = () => (
  <Space
    direction="vertical"
    style={{
      width: "100%",
    }}
  >
    <Alert message="Warning: You must be logged in to access the dashboard, please login to continue. If you do not have an account, please sign up!" banner closable />
  </Space>
);

const SimpleNavbar = () => {
    const navigate = useNavigate();

  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);


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

  const handleLogout = () => {
    Auth.logout();
  };

  const takeHome = () => {
    navigate('/')
  };

const takeToDashboard = () => {
  if (Auth.loggedIn()) {
    navigate("/dashboard");
  } else {
    setShowWarning(true);
  }
};


  return (
    <>
      {showWarning && <WarningComponent />}
      <Menu mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />} onClick={takeHome}>
          Home
        </Menu.Item>
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined />}
          onClick={takeToDashboard}
        >
          Dashboard
        </Menu.Item>
        {Auth.loggedIn() ? (
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        ) : (
          <>
            <Menu.Item
              key="login"
              icon={<LoginOutlined />}
              onClick={showLoginModal}
            >
              Login
            </Menu.Item>
            <Menu.Item
              key="signup"
              icon={<UserAddOutlined />}
              onClick={showSignupModal}
            >
              Signup
            </Menu.Item>
          </>
        )}
      </Menu>
      <LoginModal
        visible={loginVisible}
        handleOk={hideLoginModal}
        handleCancel={hideLoginModal}
      />
      <SignupModal
        visible={signupVisible}
        handleOk={hideSignupModal}
        handleCancel={hideSignupModal}
      />
    </>
  );
};

export default SimpleNavbar;
