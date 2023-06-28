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
        const currentIndex = currentExercises.findIndex(ex => ex.id === usersCurrentExercise.id);
        if (currentIndex !== -1 && currentIndex < currentExercises.length -1) {
            setUsersCurrentExercise(currentExercises[currentIndex +1]);
        }
        else if (currentIndex > currentExercises.length -1) {
            navigate('/')
        }
    } else {
        navigate('/')
    }
  }

  const progressBarValue = (currentExercises.findIndex(ex => ex.id === usersCurrentExercise + 1 ) /(currentExercises.length / 100))
 // still need to addtheexercise to user data
  return (
    <>
      <Row>
        <Progress percent={progressBarValue} />
      </Row>
      <Row justify="center">
        
      <Space direction="vertical" size={16}>
      {loadingMe || !usersCurrentExercise ? (
            <Card title={'loading... exercise'} extra={<a href="#">More</a>} style={{ width: 500}}>
            <p>loading description....</p>
          </Card>
          ) : 
        (
    <Card title={`Exercise: ${usersCurrentExercise.name}`} extra={<a href="#">More</a>} style={{ width: 500}}>
      <p>{`${usersCurrentExercise.description}`} It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
    </Card>
        )}
    </Space>
    </Row>
    <Divider type="horizontal"></Divider>
      <Row gutter={[8, 16]} justify="space-evenly">
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
      <Row  key={setNumber} gutter={[8, 16]} justify="space-evenly">
        <Col span={8}>
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
        )))}
         <Row justify="center">
      <Button type="secondary" size="large">
        add set
      </Button>
      </Row>
      <Divider type="horizontal"></Divider>
      {/* Next exercise button, on press sets next exercise in array to curretn state */}
      <Row justify="center">
      <Button type="primary" size="large" onClick={onNextExercise}>
        Next
      </Button>
      </Row>
    </>
  );
}
export default StartWorkout;
