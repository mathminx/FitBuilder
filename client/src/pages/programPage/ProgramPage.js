import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";
import { Card, Modal, Button, Descriptions, Row, Col, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { REMOVE_EXERCISE } from "../../utils/mutations";
import { REMOVE_WORKOUT } from "../../utils/mutations";

const { Title } = Typography;

// Fetch single program GraphQL Query
const GET_SINGLE_PROGRAM = gql`
  query Program($id: ID!) {
    program(_id: $id) {
      title
      duration
      daysPerWeek
      workouts {
        _id
        name
      }
    }
  }
`;

const GET_WORKOUT = gql`
  query Workout($id: ID!) {
    workout(_id: $id) {
      _id
      name
      exercises {
        _id
        name
        type
        equipment
        difficulty
        instructions
        sets
        reps
        weight
        duration
      }
    }
  }
`;

const ProgramPage = () => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [getWorkout, { loading: workoutLoading, data: workoutData }] =
    useLazyQuery(GET_WORKOUT);
  const [
    removeExercise,
    { removeExercisedata, removeEcerciseloading, removeExerciseerror },
  ] = useMutation(REMOVE_EXERCISE);
    const [
      removeWorkout,
      { removeWorkoutdata, removeWorkoutloading, removeWorkouterror },
    ] = useMutation(REMOVE_WORKOUT);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { programId } = useParams();
  const navigate = useNavigate();

  // I am getting mixed up with this and will need to come back to it.
  // const navigateToDashboard = () => {
  //   if (Auth.loggedIn()) {
  //     navigate("/dashboard"); // Redirect to dashboard if logged in.
  //   } else {
  //     navigate("/");
  //   }
  // };

  //   useEffect(() => {
  //     navigateToDashboard();
  //   }, []);

  // Fetch the program data
  const { loading, error, data, refetch } = useQuery(GET_SINGLE_PROGRAM, {
    variables: { id: programId },
  });

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const program = data?.program || {}; // If data is not yet loaded, program will be an empty object

  const handleOpenModal = (workout) => {
    setSelectedWorkout(workout);
    setSelectedWorkoutId(workout._id);
    getWorkout({ variables: { id: workout._id } });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setIsModalVisible(false);
  };

  // Replace these functions with your logic
  const handleAddExercise = () => {
    console.log("Adding a new exercise...");
    if (selectedWorkoutId) {
      navigate(`/addexercises/${selectedWorkoutId}`);
    }
  };

  const handleEditExercise = (exerciseId) => {
    console.log("Editing exercise: ", exerciseId);
  };

  const handleRemoveExercise = async (exerciseId) => {
    console.log("Removing exercise: ", exerciseId);
    console.log("workoutId:", selectedWorkoutId);

    if (selectedWorkoutId && exerciseId) {
      try {
        const { data } = await removeExercise({
          variables: { workoutId: selectedWorkoutId, exercise: exerciseId },
        });

        console.log("Exercise removed successfully: ", data);

        // After successfully removing the exercise, refetch the workout to update the data in the UI
        getWorkout({ variables: { id: selectedWorkoutId } });
      } catch (err) {
        console.error("Error removing exercise: ", err);
      }
    }
  };
  const handleDeleteWorkout = async (workoutId) => {
    console.log("Deleting workout - (workoutId): ", workoutId);
    if (workoutId && programId) {
      try {
        const { data } = await removeWorkout({
          variables: { workout: workoutId, programId: programId },
        });

        console.log("Workout removed successfully: ", data);
        refetch();
      } catch (err) {
        console.error("Error removing workout: ", err);
      }
    }
    handleCloseModal();
  };
  const handleAddWorkout = () => {
    console.log("Adding a new workout...");
    navigate(`/createworkout/${programId}`);
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
        style={{
          float: "right",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "#000000",
        }}
      >
        Delete Program
      </Button>
      <Descriptions>
        <Descriptions.Item label="Name">{program.title}</Descriptions.Item>
        <Descriptions.Item label="Duration (weeks)">
          {program.duration}
        </Descriptions.Item>
        <Descriptions.Item label="Days per week">
          {program.daysPerWeek}
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={16}>
        {program.workouts?.map((workout) => (
          <Col span={8} key={workout._id}>
            <Card title={workout.name}>
              {/* <p>Day Number: {workout.dayNumber}</p> */}
              {/* <p>Complete: {workout.complete.toString()}</p> */}
              <Button type="primary" onClick={() => handleOpenModal(workout)}>
                View Exercises
              </Button>
              <Button
                type="danger"
                onClick={() => handleDeleteWorkout(workout._id)}
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: "#000000",
                }}
              >
                Delete Workout
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <br></br>
      <Button type="primary" onClick={handleAddWorkout}>
        Add New Workout
      </Button>

      <br></br>
      <br></br>

      <Modal visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
        {workoutLoading && <p>Loading workout...</p>}

        {workoutData && workoutData.workout && (
          <>
            <Title level={2}>{workoutData.workout.name}</Title>

            {workoutData.workout.exercises.map((exercise) => (
              <Card
                key={exercise._id}
                title={exercise.name}
                style={{ marginBottom: "20px" }}
              >
                <p>Type: {exercise.type}</p>
                <p>Equipment: {exercise.equipment}</p>
                <p>Difficulty: {exercise.difficulty}</p>
                <p>Instructions: {exercise.instructions}</p>
                <p>Sets: {exercise.sets}</p>
                <p>Reps: {exercise.reps}</p>
                <p>Weight: {exercise.weight}</p>
                <p>Duration: {exercise.duration}</p>

                <Button onClick={() => handleEditExercise(exercise._id)}>
                  Edit Exercise
                </Button>
                <Button onClick={() => handleRemoveExercise(exercise._id)}>
                  Remove Exercise
                </Button>
              </Card>
            ))}

            <Button type="primary" onClick={handleAddExercise}>
              Add New Exercise
            </Button>

            <Button
              type="danger"
              onClick={() => handleDeleteWorkout(workoutData.workout._id)}
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
