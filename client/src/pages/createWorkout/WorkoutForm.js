import React from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import Auth from "../../utils/auth"

const { Option } = Select;

const WorkoutForm = () => {
  const navigate = useNavigate();
  
  if (!Auth.loggedIn) {
    navigate("/");
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Create Workout</h1>{" "}
      <Form>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Duration (weeks)"
          name="duration"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={52} />
        </Form.Item>
        <Form.Item
          label="Intensity Level"
          name="intensity"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button type="primary" htmlType="submit">
            Return
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WorkoutForm;