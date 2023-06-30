import React, { useState, useEffect } from "react";
import { Form, Select, Button, Input, Card, Row, Col, Modal, InputNumber } from "antd";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE } from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Auth from "../../utils/auth";
import "../styles/addNewExercises.css";

const { Option } = Select;
const { Meta } = Card;

const ModifyExerciseComponent = () => {
  const [form] = Form.useForm();
  const [exercises, setExercises] = useState([]);
  const { workoutId } = useParams();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentExercise, setCurrentExercise] = useState(null);

  const [savedExercises, setSavedExercises] = useState([]);
  const [addExercise, { data }] = useMutation(ADD_EXERCISE);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const showModal = (exerciseName) => {
    setIsModalVisible(true);
    setCurrentExercise(exerciseName);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentExercise(null);
  };

  const handleModalSubmit = (values) => {
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
          ...values,
        },
      ]);

      addExercise({
        variables: {
          workoutId: workoutId,
          exercise: {
            name: exerciseToSave.name,
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
    navigate(-1);
  };

  return (
    <>
      <div className="findExercisePage">
        <div className="goBackBtn">
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            Go Back
          </Button>
        </div>
        <Form
          form={form}
          name="exerciseSearch"
          onFinish={onFinish}
          layout="inline"
          className="responsiveForm"
        >
          <Row gutter={16}>
           <Col xs={24} sm={24} md={12} lg={6}>
            <Form.Item
              className="responsiveFormItem"
              style={{ marginLeft: "10px" }}
              name="type"
              label="Type"
            >
              <Select placeholder="Select a type">
                {exerciseTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
            <Form.Item
              className="responsiveFormItem"
              name="muscle"
              label="Muscle"
            >
              <Select placeholder="Muscle">
                {muscles.map((muscle) => (
                  <Option key={muscle} value={muscle}>
                    {muscle}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
            <Form.Item
              className="responsiveFormItem"
              name="difficulty"
              label="Difficulty"
            >
              <Select placeholder="Difficulty">
                {difficulties.map((difficulty) => (
                  <Option key={difficulty} value={difficulty}>
                    {difficulty}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
            <Form.Item className="responsiveFormItem" name="name" label="Name">
              <Input placeholder="Optional" />
            </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
        <div>
          <br></br>
        </div>
        <Row gutter={16}>
          {exercises.map((exercise) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={exercise.id}>
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
      </div>
      <Modal
        title="Add Exercise Details"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form onFinish={handleModalSubmit}>
          <Form.Item label="Sets" name="sets" rules={[{ required: false }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Reps" name="reps" rules={[{ required: false }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Weight (lbs)"
            name="weight"
            rules={[{ required: false }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[{ required: false }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ padding:'20px', lineHeight:'0px', border:'5px solid', borderStyle:'outset',borderColor:'#fa6d35', borderRadius:'5px', background: "#193381", fontSize: '15px', fontWeight: '600', }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModifyExerciseComponent;


