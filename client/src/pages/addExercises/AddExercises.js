import React, { useState } from "react";
import { Form, Select, Button, Input, Card, Row, Col } from "antd";
import axios from "axios";

const { Option } = Select;
const { Meta } = Card;

const ExerciseComponent = () => {
  const [form] = Form.useForm();
  const [exercises, setExercises] = useState([]);

  const exerciseTypes = [
    "cardio",
    "olympic_weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ];
  const muscles = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];
  const difficulties = ["beginner", "intermediate", "expert"];

  const onFinish = async (values) => {
    try {
      const options = {
        method: "GET",
        url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
        params: values,
        headers: {
          "X-RapidAPI-Key":
            "4acea068f2mshdbcc23c62ee4486p14fc15jsnb7caa4dbd4dc",
          "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setExercises(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data: ", error);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="exerciseSearch"
        onFinish={onFinish}
        layout="inline"
      >
        <Form.Item name="type" label="Exercise Type">
          <Select placeholder="Select a type">
            {exerciseTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="muscle" label="Muscle">
          <Select placeholder="Select a muscle">
            {muscles.map((muscle) => (
              <Option key={muscle} value={muscle}>
                {muscle}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="difficulty" label="Difficulty">
          <Select placeholder="Select a difficulty level">
            {difficulties.map((difficulty) => (
              <Option key={difficulty} value={difficulty}>
                {difficulty}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input placeholder="Optional: search by name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Row gutter={16}>
        {exercises.map((exercise) => (
          <Col span={8} key={exercise.id}>
            <Card title={exercise.name}>
              <Meta description={exercise.instructions} />
              <p>Exercise Category: {exercise.type}</p>
              <p>Target Muscle Group: {exercise.muscle}</p>
              <p>Equipment: {exercise.equipment}</p>
              <p>Difficulty: {exercise.difficulty}</p>
              <Button type="primary">Add Exercise</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ExerciseComponent;
