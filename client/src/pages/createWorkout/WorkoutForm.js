import React, { useEffect } from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Auth from "../../utils/auth"
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from '../../utils/mutations';
import { GET_SINGLE_PROGRAM } from '../../utils/queries';
import "../styles/workoutForm.css";



const { Option } = Select;

const WorkoutForm = () => {
  const navigate = useNavigate();
  const { programId } = useParams();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const [addWorkout] = useMutation(ADD_WORKOUT, {
    onCompleted: () => navigate(`/programs/${programId}`),
    refetchQueries: [{ query: GET_SINGLE_PROGRAM, variables: { id: programId } },
    ],
  });

  const onFinish = (values) => {
    addWorkout({ variables: { programId: programId, name: values.name } });
  };

  return (
    <div className="workoutForm">
      <h1 style={{ textAlign: "center" }}>Create Workout</h1>{" "}
      <Form onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={300} />
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
          <Button style={{ margin: "8px" }} onClick={() => navigate(`/program/${programId}`)}>
            {" "}
            {/* Navigate back to program page without adding a workout */}
            Return
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WorkoutForm;