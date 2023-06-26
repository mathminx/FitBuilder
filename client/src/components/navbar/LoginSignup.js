import React from "react";
import { useMutation } from "@apollo/client";
import { Modal, Button, Form, Input } from "antd";
import { ADD_USER } from "../../utils/mutations";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginModal = ({ visible, handleOk, handleCancel }) => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const onFinish = async (values) => {
    console.log(values);
    const { username, password } = values;
    try {
      const { data } = await loginUser({
        variables: { username, password },
      });
      console.log(data);
      const { token, user } = data.loginUser;
      console.log(user);
      Auth.login(token);
      handleOk();
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
        <Form.Item label="Username" name="username">
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
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const onFinish = async (values) => {
    //console.log("Success:", values);

try {

    // Destructure values object into separate variables
    const { username, email, password } = values;

    // Pass the variables explicitly in the mutation
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
} catch (error) {
    throw new Error(`An error occurred while creating a new user or signing JWT token, ${error}`);
}
    handleOk();
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
