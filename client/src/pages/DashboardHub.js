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
  Descriptions,
  Typography,
  Pagination,
  Empty,
} from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
const { Content } = Layout;
const { Title, Text } = Typography;

const { Meta } = Card;

const Dashboard = () => {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleCreateProgramClick = () => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      navigate("/createprogram"); // Redirect to dashboard if logged in.
    } else {
      navigate("/");
    }
  };

  const handleViewPrograms = () => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      navigate("/viewallprograms"); // Redirect to dashboard if logged in.
    } else {
      navigate("/");
    }
  };

  const handleStartWorkoutClick = (event) => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      const workoutId = event.target.value;
      navigate(`/startworkout`); // Redirect to dashboard if logged in.
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!loadingMe && dataMe) {
      setCurrentProgram(dataMe.me.activeProgram);
    }
  }, [loadingMe, dataMe]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {loadingMe ? (
            <Breadcrumb.Item>Loading....</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              <strong>Current Program:</strong>{" "}
              <strong>
                {currentProgram ? currentProgram.title : " No Active Program"}
              </strong>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item onClick={handleViewPrograms}>
            <Link to="/viewallprograms">
              <button
                style={{
                  padding: "4px 12px",
                  background: "none",
                  border: "none",
                  color: "#1890ff",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                View All Programs
              </button>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          {!loadingMe && currentProgram && (
            <Layout>
              <Space direction="vertical">
                <Title level={2}>Program Info</Title>
                <Text strong>Program title: </Text>
                <Text>{currentProgram.title}</Text>
                <Text strong>Duration (weeks): </Text>
                <Text>{currentProgram.duration}</Text>
                <Text strong>Days per week: </Text>
                <Text>{currentProgram.daysPerWeek}</Text>
                <Text strong>Description: </Text>
                <Text>{currentProgram.description}</Text>
                <div style={{ textAlign: "center" }}>
                  <Title level={3}>Workouts</Title>
                </div>
              </Space>
            </Layout>
          )}

          {loadingMe || !currentProgram ? (
            <Row justify="center">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Row>
          ) : (
            <>
              <Title style={{ display: "flex", justifyContent: "center" }} level={4}>
                Week {currentPage}
              </Title>{" "}
              {currentProgram.workouts &&
                currentProgram.workouts
                  .slice(
                    (currentPage - 1) * currentProgram.daysPerWeek,
                    currentPage * currentProgram.daysPerWeek
                  )
                  .map((workout, index) => (
                    <Card
                      key={workout._id}
                      title={`Workout for Day ${index + 1}`}
                    >
                      <Row>
                        <Col
                          xs={{ span: 5, offset: 1 }}
                          lg={{ span: 6, offset: 2 }}
                        >
                          <Card
                            title={workout.name}
                            style={{ width: 300 }}
                            cover={
                              <img
                                alt="example"
                                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                src={`https://picsum.photos/seed/${workout._id}//300`}
                              /> /* workout image */
                            }
                            actions={[
                              <Space direction="horizontal">
                                <Link to={`/startworkout/${workout._id}`}>
                                  <Button type="primary">Start</Button>
                                </Link>
                                <Link to="/">
                                  <Button type="secondary">View</Button>
                                </Link>
                              </Space>,
                            ]}
                          >
                            <Meta
                              title={
                                <span style={{ whiteSpace: "pre-wrap" }}>
                                  Workout Title: {workout.name}
                                </span>
                              }
                              description={`Number of exercises: ${workout.exercises.length}`}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </Card>
                  ))}
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={currentProgram.workouts.length}
                pageSize={currentProgram.daysPerWeek}
              />
            </>
          )}
        </div>
      </Content>

      <Row
        justify="center"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          paddingBottom: "50px",
        }}
      >
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            onClick={handleCreateProgramClick}
          >
            Create Program!
          </Button>
        </Space>
      </Row>
    </Layout>
  );
};

export default Dashboard;