import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Layout,
  theme,
  Card,
  Button,
  Space,
  Row,
  Col,
  Progress,
  InputNumber,
  Divider,
  Empty,
} from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_EXERCISE, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import "./styles/startWorkout.css"

const { Content } = Layout;

const { Meta } = Card;

function StartWorkout() {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [usersCurrentExercise, setUsersCurrentExercise] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const navigate = useNavigate();

    useEffect(() => {
      if (!Auth.loggedIn()) {
        navigate("/");
      }
    }, [navigate]);

  const onChange = (number) => {
    console.log("changed", number);
  };

  const { workoutId } = useParams();

  useEffect(() => {
    if (!loadingMe && dataMe) {
      let targetWorkout = dataMe.me.activeProgram.workouts.find(
        (workout) => workout._id === workoutId
      );
      let firstExercise = targetWorkout.exercises[0];
      console.log(firstExercise);
      setUsersCurrentExercise(firstExercise);
      setCurrentExerciseIndex(0);
    }
  }, []);

  useEffect(() => {
    console.log("usersCurrentExercise has changed:", usersCurrentExercise);
  }, [usersCurrentExercise]);

  let onNextExercise = () => {
    console.log("next button clicked");

    let myWorkout = dataMe.me.activeProgram.workouts.find(
      (workout) => workout._id === workoutId
    );

    if (!myWorkout) {
      console.error("Workout not found");
      return;
    }

    let myExercises = myWorkout.exercises;

    console.log("myExercises:", myExercises);
    console.log("currentExerciseIndex:", currentExerciseIndex);
    console.log(
      "Exercises with the same id:",
      myExercises.filter((ex) => ex._id === usersCurrentExercise._id)
    );

    if (currentExerciseIndex < myExercises.length - 1) {
      console.log(myExercises.length);
      setUsersCurrentExercise(myExercises[currentExerciseIndex + 1]);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      console.log("Hold UP!");
    } else if (currentExerciseIndex === myExercises.length - 1) {
      console.log("AYO");
      navigate(`/saveworkout/`);
    } else {
      navigate("/home");
    }
    console.log("usersCurrentExercise has changed:", usersCurrentExercise);
  };

  const progressBarValue =
    currentExercises.findIndex((ex) => ex.id === usersCurrentExercise + 1) /
    (currentExercises.length / 100);
  // still need to addtheexercise to user data
  return (
    <>
      <Layout
        className="startWorkoutLayout"
        style={{ minHeight: "88vh", background: "white", padding: "0 50px" }}
      >
        {/*Progress bar*/}
        <br></br>
        <Row className="progressBar" justify="center">
          <Progress percent={progressBarValue} />
        </Row>
        <br></br>
        <Row className="exerciseDescriptionCard" justify="center">
          <Space direction="vertical" size={16} style={{ color: "#193381" }}>
            {loadingMe || !usersCurrentExercise ? (
              <Card
                title={"loading... exercise"}
                extra={<a href="#">More</a>}
                style={{
                  fontWeight: "600",
                  maxWidth: 500,
                  marginTop: "2% 0",
                  border: "2px solid",
                  background: "#fa6d35",
                  borderColor: "#193381",
                }}
              >
                <p>loading description....</p>
              </Card>
            ) : (
              <Card
                title={usersCurrentExercise.name}
                extra={<a href="#">More</a>}
                style={{
                  maxWidth: 500,
                  color: "#193381",
                  borderColor: "#fa6d35",
                }}
              >
                <p>{`${usersCurrentExercise.instructions}`} </p>
              </Card>
            )}
          </Space>
        </Row>
        <Divider
          type="horizontal"
          style={{ borderWidth: 3, borderColor: "#fa6d35" }}
        ></Divider>
        <div style={{ color: "#193381", fontWeight: "600" }}>
          <Row gutter={[16, 16]} justify="center">
            <Col span={8}>
              <div>Sets</div>
            </Col>
            <Col span={8}>
              <div>Reps</div>
            </Col>
            <Col span={8}>
              <div>Weight</div>
            </Col>
          </Row>
        </div>
        {/* sets, reps, weight, table 
     creates an array through the number of sets*/}
        <Divider
          type="horizontal"
          style={{ borderWidth: 3, borderColor: "#fa6d35" }}
        ></Divider>
        {loadingMe || !usersCurrentExercise ? (
          <Row style={{ minHeight: "300px" }} justify="center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Row>
        ) : (
          Array.from(
            { length: usersCurrentExercise.sets },
            (_, i) => i + 1
          ).map((setNumber) => (
            <Row key={setNumber} gutter={[16, 16]} justify="center">
              <Col span={8}>
                <div key={setNumber}>{setNumber}</div>
                <div justify="center"></div>
              </Col>
              <Col span={8}>
                <Space>
                  <InputNumber
                    size="large"
                    min={1}
                    max={100000}
                    defaultValue={3}
                    onChange={onChange}
                  />
                </Space>
              </Col>
              <Col span={8}>
                <Space>
                  <InputNumber
                    size="large"
                    min={1}
                    max={100000}
                    defaultValue={3}
                    onChange={onChange}
                  />
                </Space>
              </Col>
            </Row>
          ))
        )}
        <br></br>
        <Row justify="center">
          <Button
            type="secondary"
            size="large"
            style={{ color: "#193381", fontWeight: "600" }}
          >
            Add Set
          </Button>
        </Row>
        <Divider
          type="horizontal"
          style={{ borderWidth: 3, borderColor: "#fa6d35" }}
        ></Divider>
        <Row justify="center">
          <Button
            style={{ marginBottom: "150px" }}
            type="primary"
            size="large"
            onClick={onNextExercise}
          >
            Next
          </Button>
        </Row>
      </Layout>
    </>
  );
          }

export default StartWorkout;
