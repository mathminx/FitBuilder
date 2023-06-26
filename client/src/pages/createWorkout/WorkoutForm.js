import React from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';

const { Option } = Select;

const WorkoutForm = () => (
  <Form>
    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Duration (weeks)" name="duration" rules={[{ required: true }]}>
      <InputNumber min={1} max={52} />
    </Form.Item>
    <Form.Item label="Intensity Level" name="intensity" rules={[{ required: true }]}>
      <Select>
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>
    </Form.Item>
    {/* Exercise selection */}
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form.Item>
  </Form>
);

export default WorkoutForm;
