import React from 'react';
import { Form, Input, Button } from 'antd';

const ExerciseForm = () => (
  <Form>
    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Description" name="description">
      <Input.TextArea />
    </Form.Item>
    {/* Image upload */}
    {/* Additional details */}
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form.Item>
  </Form>
);

export default ExerciseForm;
