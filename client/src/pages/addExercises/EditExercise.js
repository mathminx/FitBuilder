import React, {useEffect} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { GET_SINGLE_EXERCISE } from "../../utils/queries";
import { UPDATE_EXERCISE } from "../../utils/mutations";
import { useNavigate, useParams } from "react-router-dom";
import Auth from "../../utils/auth";
import "../styles/editExercise.css";


const { Option } = Select;

const EditExercise = () => {
  const { exerciseId } = useParams();
  console.log(exerciseId);
  
  const { data, loading, error } = useQuery(GET_SINGLE_EXERCISE, {
    variables: { id: exerciseId },
  });
  const [updateExercise] = useMutation(UPDATE_EXERCISE);
  const navigate = useNavigate();

    useEffect(() => {
      if (!Auth.loggedIn()) {
        navigate("/");
      }
    }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const exercise = data?.exercise;

  const onFinish = async (values) => {
    try {
        await updateExercise({ variables: { exerciseId: exerciseId, ...values } });
        message.success('Exercise updated successfully!');
        navigate(-1);
    } catch (error) {
        console.error('Error:', error);
        message.error(`Error updating exercise: ${error.message}`);
    }
    };

  return (
    <div className="editExerciseForm" style={{ width: "90%" }}>
      <h1>Edit Exercise</h1>
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
          rules={[{ required: false }]}
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
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Sets" name="sets" rules={[{ required: false }]}>
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label="Reps" name="reps" rules={[{ required: false }]}>
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label="Weight" name="weight" rules={[{ required: false }]}>
          <InputNumber min={0} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[{ required: false }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button style={{ marginLeft: "0px" }} onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ marginBottom: "70px" }}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditExercise;
