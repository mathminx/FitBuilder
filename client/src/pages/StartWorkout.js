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

const { Content } = Layout;

const { Meta } = Card;

function StartWorkout() {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [usersCurrentExercise, setUsersCurrentExercise] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const navigate = useNavigate();

  const onChange = (number) => {
    console.log("changed", number);
  };

  const { workoutId } = useParams();
//sets teh initial workout
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
// checking if state has changed
  useEffect(() => {
    console.log("usersCurrentExercise has changed:", usersCurrentExercise);
  }, [usersCurrentExercise]);
// increases the users index so the state moves through the array therefore changing the state
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
    <Layout className="layout" style={{minHeight: '88vh', background: 'white', padding: "0 50px",}}>
    {/*Progress bar*/}
      <Row justify="center" >
        <Progress percent={progressBarValue}/>
      </Row>

      <Row justify="center">
        <Space direction="vertical" size={16} style={{color:'#193381'}}>
          {loadingMe || !usersCurrentExercise ? (
            <Card
              title={"loading... exercise"}
              extra={<a href="#">More</a>}
              style={{ fontWeight:'600', width: 500, marginTop:'2% 0', border:'2px solid', background:'#fa6d35', borderColor:'#193381'}}
            >
              <p>loading description....</p>
            </Card>
          ) : (
            <Card
              title={usersCurrentExercise.name}
              extra={<a href="#">More</a>}
              style={{ width: 500, color: '#193381'}}
            >
              <p>{`${usersCurrentExercise.instructions}`} </p>
            </Card>
          )}
        </Space>
      </Row>
      <Row justify="center">
          <Button type="primary" size="large" onClick={onNextExercise}>
            Next
          </Button>
        </Row>
      <Divider type="horizontal" style={{ borderWidth: 3, borderColor: '#fa6d35' }}></Divider>
      <div style={{ color: '#193381', fontWeight:'600'}}>
      <Row gutter={[8, 16]} justify="center">
        <Col span={8}>
          <div >Sets</div>
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
      <Divider type="horizontal" style={{ borderWidth: 3, borderColor: '#fa6d35' }}></Divider>
      {loadingMe || !usersCurrentExercise ? (
        <Row style={{minHeight:'300px'}} justify="center">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Row>
      ) : (
        Array.from({ length: usersCurrentExercise.sets }, (_, i) => i + 1).map(
          (setNumber) => (
            <Row key={setNumber} gutter={[8, 16]} justify="center">
              <Col span={6}>
                <div key={setNumber}>{setNumber}</div>
                <div justify="center"></div>
              </Col>
              <Col span={4}>
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
          )
        )
      )}
      <Row justify="center">
        <Button type="secondary" size="large" style={{color:"#193381", fontWeight:'600'}}>
          add set
        </Button>
      </Row>
      <Divider type="horizontal" style={{ borderWidth: 3, borderColor: '#fa6d35' }}></Divider>
      {/* Next exercise button, on press sets next exercise in array to curretn state */}
      <Row justify="center">
      </Row>
      </Layout>
    </>
  )
          }

export default StartWorkout;
