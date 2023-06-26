import React, { useState } from "react";
import { Card, Modal, Button, Descriptions, Row, Col, Typography } from "antd";

const { Title } = Typography;

// Replace with your data
const PROGRAM_INFORMATION = {
  name: "Program 1",
  description: "Program description",
  startDate: "2023-01-01",
  endDate: "2023-12-31",
};

// Replace with your data
const WORKOUTS = [
  { id: 1, name: "Workout 1", description: "Workout description" },
  // Add more workouts...
];

// Replace with your data
const EXERCISES = [
  { id: 1, name: "Exercise 1", description: "Exercise description" },
  // Add more exercises...
];

const ProgramPage = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (workout) => {
    setSelectedWorkout(workout);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setIsModalVisible(false);
  };

  // Replace these functions with your logic
  const handleAddExercise = () => {
    console.log("Adding a new exercise...");
  };

  const handleEditExercise = (exerciseId) => {
    console.log("Editing exercise: ", exerciseId);
  };

  const handleRemoveExercise = (exerciseId) => {
    console.log("Removing exercise: ", exerciseId);
  };

  const handleDeleteWorkout = (workoutId) => {
    console.log("Deleting workout: ", workoutId);
    handleCloseModal(); // Close the modal after deleting the workout
  };

  const handleAddWorkout = () => {
    console.log("Adding a new workout...");
  };

  const handleDeleteProgram = () => {
    console.log("Deleting program...");
  };

  return (
    <>
      <Title level={2}>Program Details</Title>
      <Button
        type="danger"
        onClick={handleDeleteProgram}
        style={{ float: "right" }}
      >
        Delete Program
      </Button>
      <Descriptions>
        <Descriptions.Item label="Name">
          {PROGRAM_INFORMATION.name}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {PROGRAM_INFORMATION.description}
        </Descriptions.Item>
        <Descriptions.Item label="Start Date">
          {PROGRAM_INFORMATION.startDate}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {PROGRAM_INFORMATION.endDate}
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={16}>
        {WORKOUTS.map((workout) => (
          <Col span={8} key={workout.id}>
            <Card title={workout.name}>
              <p>{workout.description}</p>
              <Button type="primary" onClick={() => handleOpenModal(workout)}>
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Button type="primary" onClick={handleAddWorkout}>
        Add New Workout
      </Button>

      <Modal visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
        {selectedWorkout && (
          <>
            <Title level={2}>{selectedWorkout.name}</Title>
            <p>{selectedWorkout.description}</p>

            {EXERCISES.map((exercise) => (
              <Card
                key={exercise.id}
                title={exercise.name}
                style={{ marginBottom: "20px" }}
              >
                <p>{exercise.description}</p>
                <Button onClick={() => handleEditExercise(exercise.id)}>
                  Edit Exercise
                </Button>
                <Button onClick={() => handleRemoveExercise(exercise.id)}>
                  Remove Exercise
                </Button>
              </Card>
            ))}

            <Button type="primary" onClick={handleAddExercise}>
              Add New Exercise
            </Button>

            <Button
              type="danger"
              onClick={() => handleDeleteWorkout(selectedWorkout.id)}
            >
              Delete Workout
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ProgramPage;
