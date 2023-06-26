import React from "react";
import { useMutation } from "@apollo/client";
import { Modal, Button, Form, Input } from "antd";
import { ADD_USER } from "../../utils/mutations";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ visible, handleOk, handleCancel }) => {
  const navigate = useNavigate();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const onFinish = async (values) => {
    console.log(values);
    const { email, password } = values;
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      console.log(data);
      const { token, user } = data.login;
      console.log(user);

      try {
        Auth.login(token);
      } catch (error) {
        console.error("Error during Auth.login:", error);
      }

      try {
        handleOk();
      } catch (error) {
        console.error("Error during handleOk:", error);
      }

      try {
        navigate("/dashboard");
      } catch (error) {
        console.error("Error during navigate:", error);
      }
    
    } catch (error) {
      console.error("Attempt to log in failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Login"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="email " name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>

      {error && <p>There was an error logging in. Please try again.</p>}
    </Modal>
  );
};

export default LoginModal;

const SignupModal = ({ visible, handleOk, handleCancel }) => {
  const navigate = useNavigate();
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const onFinish = async (values) => {

try {
  const { username, email, password } = values;

  const { data } = await addUser({
    variables: { username, email, password },
  });
  if (!data) {
    throw new Error("something went wrong with the GraphQl server!");
  }
  console.log(data);
  const { token, user } = data.addUser;
  console.log(user);
  Auth.login(token);
  handleOk();
  navigate("/dashboard");
} catch (error) {
      throw new Error(`An error occurred while creating a new user or signing JWT token, ${error}`);
    }   
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title="Signup"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Signup
          </Button>
        </Form.Item>
      </Form>

      {error && <p>There was an error signing up. Please try again.</p>}
    </Modal>
  );
};

export { LoginModal, SignupModal };
