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
  Empty
} from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_EXERCISE, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
const { Content } = Layout;

const { Meta } = Card;

function StartWorkout() {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const { loading: loadingExercise, data: dataExercise } = useQuery(GET_SINGLE_EXERCISE);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [usersCurrentExercise, setUsersCurrentExercise] = useState(null);
  const navigate = useNavigate();

  const onChange = (number) => {
    console.log('changed', number);
  };

  useEffect(() => {
    if (!loadingMe && dataMe) {
        let firstWorkout = dataMe.me.activeProgram.workouts[0];
        let firstExercise = firstWorkout.exercises[0];
        console.log(firstExercise);
        setUsersCurrentExercise(firstExercise);
    }
}, [loadingMe, dataMe]);

const onNextExercise = () => {
    console.log('next button clicked')
    if (Auth.loggedIn()) {
        // Flatten exercises from all workouts into one array
        let allExercises = dataMe.me.activeProgram.workouts.flatMap(workout => workout.exercises);
        const currentIndex = allExercises.findIndex(ex => ex.id === usersCurrentExercise.id);
        if (currentIndex !== -1 && currentIndex < allExercises.length - 1) {
            setUsersCurrentExercise(allExercises[currentIndex + 1]);
        }
        else if (currentIndex >= allExercises.length - 1) {
            navigate('/')
        }
    }
};

  const progressBarValue = (currentExercises.findIndex(ex => ex.id === usersCurrentExercise + 1 ) /(currentExercises.length / 100))
 // still need to addtheexercise to user data
  return (
    <>
      <Row>
        <Progress percent={progressBarValue} />
      </Row>
      <Row justify="center">
      <Row justify="center">
      <Button type="primary" size="large" onClick={onNextExercise}>
        Next
      </Button>
      </Row>
      <Space direction="vertical" size={16}>
      {loadingMe || !usersCurrentExercise ? (
            <Card title={'loading... exercise'} extra={<a href="#">More</a>} style={{ width: 500}}>
            <p>loading description....</p>
          </Card>
          ) : 
        (
    <Card title={usersCurrentExercise.name} extra={<a href="#">More</a>} style={{ width: 500}}>
      <p>{`${usersCurrentExercise.instructions}`} </p>
    </Card>
        )}
    </Space>
    </Row>
    <Divider type="horizontal"></Divider>
      <Row gutter={[8, 16]} justify="center">
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
     { /* sets, reps, weight, table 
     creates an array through the number of sets*/}
       <Divider type="horizontal"></Divider>
       {loadingMe || !usersCurrentExercise ? (
            <Row justify="center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            </Row>
          ) : 
        ( Array.from({length: usersCurrentExercise.sets}, (_, i) => i + 1).map((setNumber) => (
      <Row  key={setNumber} gutter={[8, 16]} justify="center">
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
        )))}
         <Row justify="center">
      <Button type="secondary" size="large">
        add set
      </Button>
      </Row>
      <Divider type="horizontal"></Divider>
      {/* Next exercise button, on press sets next exercise in array to curretn state */}
      {/* <Row justify="center">
      <Button type="primary" size="large" onClick={onNextExercise}>
        Next
      </Button>
      </Row> */}
    </>
  );
}
export default StartWorkout;
