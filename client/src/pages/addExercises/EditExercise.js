import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { GET_SINGLE_EXERCISE, UPDATE_EXERCISE } from "../../utils/queries";


const { Option } = Select;

const EditExercise = ({ exerciseId }) => {
  const { data, loading, error } = useQuery(GET_SINGLE_EXERCISE, {
    variables: { id: exerciseId },
  });
  const [updateExercise] = useMutation(UPDATE_EXERCISE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const exercise = data?.exercise;

  const onFinish = async (values) => {
    try {
        await updateExercise({ variables: { id: exerciseId, ...values } });
        message.success('Exercise updated successfully!');
    } catch (error) {
        console.error('Error:', error);
        message.error(`Error updating exercise: ${error.message}`);
    }
    };

  return (
    <Form
      onFinish={onFinish}
      initialValues={exercise}
      layout="vertical"
      name="editExerciseForm"
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Type" name="type" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Equipment" name="equipment">
        <Input />
      </Form.Item>

      <Form.Item
        label="Difficulty"
        name="difficulty"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="expert">Expert</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Instructions"
        name="instructions"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Sets" name="sets" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item label="Reps" name="reps" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item label="Weight" name="weight" rules={[{ required: true }]}>
        <InputNumber min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditExercise;
