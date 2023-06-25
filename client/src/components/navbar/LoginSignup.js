import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Modal, Button, Form, Input } from "antd";
import { ADD_USER } from "../../utils/mutations";
import { LOGIN_USER } from "../../utils/mutations";

const LoginModal = ({ visible, handleOk, handleCancel }) => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  
    const onFinish = async (values) => {
      console.log("Success:", values);
      const { data } = await loginUser({ variables: values });
      console.log(data);
      handleOk();
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
    >
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const SignupModal = ({ visible, handleOk, handleCancel }) => {
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const onFinish = async (values) => {
    console.log("Success:", values);
    const { data } = await addUser({ variables: values });
    console.log(data);
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
