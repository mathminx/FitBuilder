import React, { useState } from "react";
import { Form, Select, Button, Input, Card, Row, Col, Modal, InputNumber } from "antd";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE } from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Meta } = Card;

const ExerciseComponent = () => {
  const [form] = Form.useForm();
  const [exercises, setExercises] = useState([]);
  const { workoutId } = useParams();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentExercise, setCurrentExercise] = useState(null);

  const [savedExercises, setSavedExercises] = useState([]);
  const [addExercise, { data }] = useMutation(ADD_EXERCISE);
  const navigate = useNavigate();

  // The authentication is messing with the build and causes the api call to immediately error.
  // if (Auth.loggedIn()) {
  //   navigate(`/programs/${workoutId}`); // Redirect to dashboard if logged in.
  // } else {
  //   navigate("/");
  // }

  // Function to open modal
  const showModal = (exerciseName) => {
    setIsModalVisible(true);
    setCurrentExercise(exerciseName);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentExercise(null);
  };

  // Function to handle form submission from within the modal
  const handleModalSubmit = (values) => {
    // Retrieve the exercise info from `exercises` state by the matching name
    const exerciseToSave = exercises.find(
      (exercise) => exercise.name === currentExercise
    );

    if (
      exerciseToSave &&
      !savedExercises.find((ex) => ex.name === currentExercise)
    ) {
      setSavedExercises((prevExercises) => [
        ...prevExercises,
        {
          ...exerciseToSave,
          ...values, // merge in the values from the form
        },
      ]);

      addExercise({
        variables: {
          workoutId: workoutId,
          exercise: {
            name: exerciseToSave.name,
            // include other exercise fields as needed
            type: exerciseToSave.type,
            instructions: exerciseToSave.instructions,
            equipment: exerciseToSave.equipment,
            difficulty: exerciseToSave.difficulty,
            sets: values.sets,
            reps: values.reps,
            weight: values.weight,
            duration: values.duration,
          },
        },
      }).catch((error) => {
        console.error("Error occurred while saving the exercise: ", error);
      });
    }

    closeModal();
  };

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
          "X-RapidAPI-Key":process.env.REACT_APP_RAPID_API_KEY,
          // "X-RapidAPI-Key":
          //   "4acea068f2mshdbcc23c62ee4486p14fc15jsnb7caa4dbd4dc",
          "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setExercises(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data: ", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // This navigates to the previous page
  };

  return (
    <>
      <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
        Go Back
      </Button>
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
              {/* <Button type="primary">Add Exercise</Button> */}
              <Button
                type="primary"
                onClick={() => showModal(exercise.name)}
                disabled={
                  !!savedExercises.find((ex) => ex.name === exercise.name)
                }
              >
                {!!savedExercises.find((ex) => ex.name === exercise.name)
                  ? "Exercise Saved"
                  : "Add Exercise"}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add the modal with the form */}
      <Modal
        title="Add Exercise Details"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form onFinish={handleModalSubmit}>
          <Form.Item label="Sets" name="sets" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Reps" name="reps" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Weight (lbs)" name="weight" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExerciseComponent;
