import React from 'react';
import { Form, Input, Select, Button, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import {ExerciseList} from './ExerciseList';
import CheckLoggedIn from './CheckLogin';

const { Option } = Select;

const WorkoutForm = () => {
const isLoggedIn = CheckLoggedIn();

  if (!isLoggedIn) {
   
    return <Redirect to="/Dashboard" />;
  }

  return (
  <><Form>
      <Form.Item label="Cover Photo" name="coverPhoto">
        <Upload>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Intensity Level" name="intensity" rules={[{ required: true }]}>
        <Select>
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
      </Form.Item>
      <ExerciseList></ExerciseList>
        {/* Remaining form items */}
      </Form>
      <Form.Item>
        <Link to="/add-workout">Add a workout program</Link>
      </Form.Item>
      <Form.Item>
        <Link to="./Dashboard">Back to Dashboard</Link>
      </Form.Item>
    </>
  );
};

export default WorkoutForm;

