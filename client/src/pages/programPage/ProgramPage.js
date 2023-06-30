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
      >
        Program Details
      </Title>

      <Button
        type="primary"
        onClick={() => navigate("/viewallprograms")}
        style={{ paddingTop:'13px', paddingBottom:'26px',lineHeight:'0px', border:'5px solid', 
        borderStyle:'outset',  borderColor:'#fa6d35', borderRadius:'5px', 
        background: "#193381", fontSize: '15px', fontWeight: '600', marginLeft: "5%", marginRight: "5%" }}
      >
        <ArrowLeftOutlined /> Return to All Programs
      </Button>

      <Button
        type="primary"
        onClick={handleAddWorkout}
        style={{ padding:'20px', lineHeight:'0px', 
        border:'5px solid', borderStyle:'outset',  
        borderColor:'#fa6d35', borderRadius:'5px', 
        background: "#193381", fontSize: '15px', fontWeight: '600', marginRight: "5%" }}      >
        Add New Workout
      </Button>

      <Button
        type="primary"
        onClick={handleActiveProgram}
        disabled={userData?.me?.activeProgram?._id === programId}
        style={{ padding:'20px', lineHeight:'0px', 
        border:'5px solid', borderStyle:'outset',  
        borderColor:'#fa6d35', borderRadius:'5px', 
        background: "#193381", fontSize: '15px', fontWeight: '600', marginBottom: "50px", color:'white' }} 
      >
        Update Active Program
      </Button>

      <Link to={`/modifyprogram/${programId}`}>
        <Button
          type="primary"
          style={{
            
            
            marginLeft: "5%",
            padding:'20px', 
            lineHeight:'0px', 
            border:'5px solid', 
            borderStyle:'outset',  
            borderColor:'#fa6d35', borderRadius:'5px', background: "#193381", fontSize: '15px', fontWeight: '600', 
          }}
        >
          Modify Program
        </Button>
      </Link>

      <Button
        type="primary"
        ghost
        danger
        onClick={handleDeleteProgram}
        style={{
          marginLeft: "8%",
          borderStyle: "dashed",
          borderWidth: "1px",
          borderColor: "red",
          marginRight: "50px",
          marginTop: '10px'
        }}
      >
        Delete Program
      </Button >
      
      
      <Descriptions className="programDescriptions">
        <Descriptions.Item className="boldLabel" label="Name">
          {program.title}
        </Descriptions.Item>
        <Descriptions.Item className="boldLabel" label="Duration (weeks)">
          {program.duration}
        </Descriptions.Item>
        <Descriptions.Item className="boldLabel" label="Workouts Per Week">
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
              <Button type="primary" style={{ padding:'20px', lineHeight:'0px', border:'5px solid', 
                borderStyle:'outset',  borderColor:'#fa6d35', borderRadius:'5px', background: "#193381", 
                fontSize: '15px', fontWeight: '600', marginBottom: "50px" }} 
                onClick={() => handleOpenModal(workout)}>
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
                  marginLeft: "1px",
                }}
              >
                Delete Workout
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <br></br>
      

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
                <p><span className="boldLabel">Type:</span> {exercise.type}</p>
                <p><span className="boldLabel">Equipment:</span> {exercise.equipment}</p>
                <p><span className="boldLabel">Difficulty:</span> {exercise.difficulty}</p>
                <p><span className="boldLabel">Instructions:</span>
                   {exercise.instructions}
                </p>
                <p><span className="boldLabel">Sets:</span> {exercise.sets}</p>
                <p><span className="boldLabel">Reps:</span> {exercise.reps}</p>
                <p><span className="boldLabel">Weight:</span> {exercise.weight}</p>
                <p><span className="boldLabel">Duration:</span> {exercise.duration}</p>

                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => handleEditExercise(exercise._id)}
                >
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
