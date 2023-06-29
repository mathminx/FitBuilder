import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Card, Button, Space, Row, Col, ConfigProvider, Empty } from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth"
const { Content } = Layout;

const { Meta } = Card;

const SarahDashboard = () => {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentProgram, setCurrentProgram] = useState(null);
  const navigate = useNavigate();

  const handleCreateProgramClick = () => {
    console.log('button clicked');
     if (Auth.loggedIn()) {
         navigate('/createprogram'); // Redirect to dashboard if logged in.
     } else {
      navigate('/')
     }
   };

   const handleViewPrograms = () => {
    console.log('button clicked');
     if (Auth.loggedIn()) {
         navigate('/viewallprograms'); // Redirect to dashboard if logged in.
     } else {
      navigate('/')
     }
   };

   const handleStartWorkoutClick = (event) => {
    console.log('button clicked');
     if (Auth.loggedIn()) {
      const workoutId = event.target.value
         navigate(`/startworkout`); // Redirect to dashboard if logged in.
     } else {
      navigate('/')
     }
   };

  useEffect(() => {
    if (!loadingMe && dataMe) {
      const currentProgram = dataMe.me.programs.find(
        (program) => program.current === true
      );
      setCurrentProgram(currentProgram);
    }
  }, [loadingMe, dataMe]);

  


  const styles = {
    layoutStyle: {
      minHeight: '88vh',
      background: 'white',
      padding: "0 50px",
    }
  }

   // const workouts = data?.singleprogram || []
  // place components in here
  
  return (
    <Layout style={styles.layoutStyle}>
      <Content>
        <Breadcrumb
          style={{ margin: "30px 0", color: 'rgb(0, 0, 0, .6)' }}
        >
            <Breadcrumb.Item >
              Current Program:
              {currentProgram ? currentProgram.name : " No current Program"}
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={handleViewPrograms}>View all Programs</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: 'white',
            minHeight: '60vh',
          }}
        >

        {/* number of cards changes depending on number of workouts per week in program */}
        <Row style={{marginTop: '30px'}}>
          
          {/* Card header */}
          <Card style={{background: '#fa6d35', color: '#193381', border: 'solid 2px', borderColor:'#193381'}} title={"Workouts For the Week"} >
            <Card style={{border:'solid #193381 2px' }} 
              title={"hi"} 
              cover={ 
                <img style={{width:'99%', margin: '.5%' }}
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                /> /* program image */
              }
              actions={[
                <Space direction="horizontal">
                    <Button type="primary" style={{background: '#fa6d35', lineHeight:'16px', fontWeight: '500', border:'2px solid', borderColor:'#193381'}} onClick={handleStartWorkoutClick}>Start</Button>
                  <Link to="/">
                    <Button type="secondary">View</Button>
                  </Link>
                </Space>
              ]}
            >
              {/* Exercise title */}
              <Meta title={"Squat Day"} description="Day of Squats"/>
            </Card>
          </Card>
        </Row>
      </div>
      </Content>
      
      {/*Create Program button */}
      <Row justify="center" style={{paddingBottom: '10%'}}>
        <Space size='large'>
          <Button type="primary" style={{ padding:'20px', lineHeight:'0px', border:'5px solid', borderStyle:'outset',  borderColor:'#fa6d35', borderRadius:'5px', background: "#193381", fontSize: '15px', fontWeight: '600', margin: "0 50% 0% 50%" }}size="large" onClick={handleCreateProgramClick}>
            Create a Program!
          </Button>
          <Link to="/">
            <Button type="secondary" style={{ color:'#193381', fontWeight:"bolder", position: "relative", left:'400%'}}>Next Week  &#10148; </Button>
          </Link>
        </Space>
      </Row>
    </Layout>
  );
};


export default SarahDashboard;

// export