import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = (values) => {
    // Perform signup logic here
    if (values.username && values.password && values.email) {
      // Successful signup
      console.log('Signup successful');
    } else {
      // Failed signup
      console.log('Please fill in all the fields');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <Form onFinish={handleSignup}>
        <Form.Item label="Username" name="username">
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
