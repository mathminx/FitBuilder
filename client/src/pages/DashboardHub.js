import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, theme, Card, Button, Space, Row, Col, Empty } from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth"
const { Content } = Layout;

const { Meta } = Card;

const Dashboard = () => {
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

  // const workouts = data?.singleprogram || []
  // place components in here
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          {loadingMe ? (
            <Breadcrumb.Item>Loading....</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              Current Program:
              {currentProgram ? currentProgram.name : " No current Program"}
            </Breadcrumb.Item>
          )}
            <Breadcrumb.Item onClick={handleViewPrograms}>View all Programs</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {/* number of cards changes depending on number of workouts per week in program */}

          {loadingMe || !currentProgram ? (
            <Row justify="center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            </Row>
          ) : (
            currentProgram.workouts.map((workouts) => (
              <Card key={workouts._id} title="Workouts For the Week">
                <Row>
                  <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card
                      title={workouts.dayNumber}
                      style={{
                        width: 300,
                      }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        /> /* program image */
                      }
                      actions={[
                        <Space direction="horizontal">
                            <Button type="primary" onClick={handleStartWorkoutClick} value={workouts._id}>Start</Button>
                          <Link to="/">
                            <Button type="secondary">View</Button>
                          </Link>
                        </Space>,
                      ]}
                    >
                      <Meta title={workouts.name} description="Day of Squats" />
                    </Card>
                  </Col>
                </Row>
              </Card>
            ))
          )}

          <Row justify="end">
            <Space direction="horizontal">
              <Link to="/">
                <Button type="secondary">Next Week</Button>
              </Link>
            </Space>
          </Row>
        </div>
      </Content>
      <Row justify="center" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Space direction="vertical">
            <Button type="primary" size="large" onClick={handleCreateProgramClick}>
              Create Program!
            </Button>
        </Space>
      </Row>
    </Layout>
  );
};

export default Dashboard;

// export
