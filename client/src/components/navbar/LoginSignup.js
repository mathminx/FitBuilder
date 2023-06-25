import React from "react";
import { Modal, Button, Form, Input } from "antd";

const LoginModal = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal
      title="Login"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
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
  return (
    <Modal
      title="Signup"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { LoginModal, SignupModal };
