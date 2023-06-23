import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (values) => {
    // Perform authentication logic here
    if (values.username && values.password) {
      // Successful login
      console.log('Login successful');
    } else {
      // Failed login
      console.log('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onFinish={handleLogin}>
        <Form.Item label="Username" name="username">
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
