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
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

const { Content } = Layout;

const { Meta } = Card;

function StartWorkout() {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [usersCurrentExercise, setUsersCurrentExercise] = useState(null);
  const navigate = useNavigate();

  const onChange = (number) => {
    console.log('changed', number);
  };

  useEffect(() => {
    if(!loadingMe && dataMe) {
        const currentExercises = dataMe.me.program_id.workouts_id.exercise
            setCurrentExercises(currentExercises)
            console.log(currentExercises)
            setUsersCurrentExercise(currentExercises[0])
    }
  }, [loadingMe, dataMe])

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
    <Layout className="layout" style={{minHeight: '88vh', background: 'white', padding: "0 50px",}}>
    <>
    {/*Progress bar*/}
      <Row justify="center" >
        <Progress percent={progressBarValue}/>
      </Row>

      <Row justify="center">
        <Space direction="vertical" size={16} style={{color:'#193381'}}>
        {loadingMe || !usersCurrentExercise ? (
          <Card title={'loading exercise... '} extra={<a href="#">More</a>} style={{ fontWeight:'600', width: 500, marginTop:'2% 0', border:'2px solid', background:'#fa6d35', borderColor:'#193381'}}>
            <p >loading description....</p>
          </Card>
            ) : 
          (
        <Card title={`Exercise: ${usersCurrentExercise.name}`} extra={<a href="#">More</a>} style={{ width: 500, color: '#193381'}}>
          <p>{`${usersCurrentExercise.description}`} It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </Card>
          )}
        </Space>
      </Row>
      <Divider type="horizontal" style={{ borderWidth: 3, borderColor: '#fa6d35' }}></Divider>
      <div style={{ color: '#193381', fontWeight:'600'}}>
      <Row gutter={[8, 16]} justify="space-evenly" >
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
     { /* sets, reps, weight, table 
     creates an array through the number of sets*/}
    <Divider style={{ borderWidth: 3, borderColor: '#fa6d35' }} type="horizontal"></Divider>
    {loadingMe || !usersCurrentExercise ? (
      <Row style={{minHeight:'300px'}} justify="center">
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
            <Button type="secondary" size="large" style={{color:"#193381", fontWeight:'600'}}>
              Add set
            </Button>
          </Row>
          <Divider style={{ borderWidth: 3, borderColor: '#fa6d35' }} type="horizontal"></Divider>
          {/* Next exercise button, on press sets next exercise in array to curretn state */}
          <Row justify="center" >
          <Button type="primary"
                style={{ padding:'20px', lineHeight:'0px', border:'5px solid', borderStyle:'outset',  borderColor:'#fa6d35', borderRadius:'5px', background: "#193381", fontSize: '15px', fontWeight: '600' }} size="large" onClick={onNextExercise}>
            Next
          </Button>
          </Row>
        </>
    </Layout>
  );

}

export default StartWorkout;
