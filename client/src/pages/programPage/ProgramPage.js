import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";
import { Card, Modal, Button, Descriptions, Row, Col, Typography } from "antd";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { REMOVE_EXERCISE, REMOVE_PROGRAM } from "../../utils/mutations";
import { REMOVE_WORKOUT } from "../../utils/mutations";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { GET_ME } from "../../utils/queries";
import { UPDATE_ACTIVE_PROGRAM } from "../../utils/mutations";
import "../styles/programDetails.css";

const { Title } = Typography;

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
    { removeExercisedata, removeExcerciseloading, removeExerciseerror },
  ] = useMutation(REMOVE_EXERCISE);
    const [
      removeWorkout,
      { removeWorkoutdata, removeWorkoutloading, removeWorkouterror },
    ] = useMutation(REMOVE_WORKOUT);
    const [removeProgram, { removeProgramdata, removeProgramloading, removeProgramerror},] = useMutation(REMOVE_PROGRAM, {refetchQueries: [{query: GET_ME}]});
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_ME);
  const [updateActiveProgram] = useMutation(UPDATE_ACTIVE_PROGRAM);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { programId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const { loading, error, data, refetch } = useQuery(GET_SINGLE_PROGRAM, {
    variables: { id: programId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const program = data?.program || {}; 

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

  const handleAddExercise = () => {
    console.log("Adding a new exercise...");
    if (selectedWorkoutId) {
      navigate(`/addexercises/${selectedWorkoutId}`);
    }
  };

  const handleEditExercise = (exerciseId) => {
    console.log("Editing exercise: ", exerciseId);
    if ( exerciseId) {
      navigate(`/modifyexercise/${exerciseId}`);
    }
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

  const handleActiveProgram = () => {
    console.log("Attempting to switch to new active program!");
    updateActiveProgram({
      variables: {
        userId: userData?.me._id,
        programId: programId,
      },
      refetchQueries: [{ query: GET_ME }], 
    })
      .then(() => {
        console.log("Active program updated successfully.");
      })
      .catch((error) => {
        console.error("Failed to update active program:", error);
      });
    console.log("Switching to new active program!");
  };

  const handleDeleteProgram = () => {
    console.log("Trying to delete program...");
    console.log(userData.me._id);
    if (programId && userData.me._id) {
      removeProgram({
        variables: { programId: programId, userId: userData.me._id },
      })
        .then((data) => {
          console.log("Program removed successfully: ", data);
          navigate("/viewallprograms");
        })
        .catch((err) => {
          console.error("Error removing program: ", err);
        });
    }
    console.log("Deleting program...");
  };

  return (
    <>
      <Title
        className="programDetailsTitle"
        level={2}
        style={{ marginLeft: "10px" }}
      >
        Program Details
      </Title>
      <Button
        type="primary"
        onClick={() => navigate("/viewallprograms")}
        style={{ marginBottom: "20px", marginLeft: "10px" }}
      >
        <ArrowLeftOutlined /> Return to All Programs
      </Button>
      <Button
        type="primary"
        ghost
        danger
        onClick={handleDeleteProgram}
        style={{
          float: "right",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "red",
          marginRight: "10px",
        }}
      >
        Delete Program
      </Button>
      <Link to={`/modifyprogram/${programId}`}>
        <Button
          type="primary"
          style={{
            float: "right",
            marginRight: "10px",
          }}
        >
          Modify Program
        </Button>
      </Link>
      <Descriptions>
        <Descriptions.Item label="Name">{program.title}</Descriptions.Item>
        <Descriptions.Item label="Duration (weeks)">
          {program.duration}
        </Descriptions.Item>
        <Descriptions.Item label="Workouts Per Week">
          {program.daysPerWeek}
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={[16, 24]}>
        {program.workouts?.map((workout) => (
          <Col xs={24} sm={12} md={8} key={workout._id}>
            <Card
              title={workout.name}
              style={{
                marginBottom: "1px",
                marginRight: "20px",
                marginLeft: "20px",
              }}
            >
              <Button type="primary" onClick={() => handleOpenModal(workout)}>
                View Exercises
              </Button>
              <Button
                type="primary"
                ghost
                danger
                onClick={() => handleDeleteWorkout(workout._id)}
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: "red",
                  marginTop: "5px",
                }}
              >
                Delete Workout
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <br></br>
      <Button
        type="primary"
        onClick={handleAddWorkout}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        Add New Workout
      </Button>

      <Button
        type="primary"
        onClick={handleActiveProgram}
        disabled={userData?.me?.activeProgram?._id === programId}
        style={{ marginBottom: "50px" }}
      >
        Update Active Program
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
