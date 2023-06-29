import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Layout,
  theme,
  Card,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Pagination,
  Empty,
} from "antd";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import "./styles/DashboardHub.css"
const { Content } = Layout;
const { Title, Text } = Typography;

const { Meta } = Card;

const Dashboard = () => {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreateProgramClick = () => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      navigate("/createprogram");
    } else {
      navigate("/");
    }
  };

  const handleViewPrograms = () => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      navigate("/viewallprograms"); 
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

  const styles = {
    layoutStyle: {
      minHeight: '88vh',
      background: 'white',
      padding: "0 50px",
    }
  }

  return (
    <Layout className="mainLayout" style={styles.layoutStyle}>
      <Content className="dashboard-content" style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "30px 0", color: "#193381" }}>
          {loadingMe ? (
            <Breadcrumb.Item>Loading....</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              <strong>Current Program: </strong>{" "}
              <strong>
                {currentProgram ? currentProgram.title : " No Active Program"}
              </strong>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item onClick={handleViewPrograms}>
            <Link to="/viewallprograms">
              <button
                style={{
                  padding: "4px 2px",
                  background: "none",
                  border: "none",
                  color: "#193381",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "inherit",
                  fontWeight: "bolder",
                }}
              >
                View All Programs
              </button>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: "white", minHeight: "60vh" }}
        >
          {!loadingMe && currentProgram && (
            <Layout style={{ backgroundColor: "#f0f2f5", padding: "30px" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Title
                  level={2}
                  style={{ color: "#1890ff", marginBottom: "20px" }}
                >
                  Program Info
                </Title>
                <div style={{ marginBottom: "10px" }}>
                  <Text strong style={{ color: "#1890ff" }}>
                    Program title:{" "}
                  </Text>
                  <Text style={{ color: "#323232" }}>
                    {currentProgram.title}
                  </Text>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Text strong style={{ color: "#1890ff" }}>
                    Duration (weeks):{" "}
                  </Text>
                  <Text style={{ color: "#323232" }}>
                    {currentProgram.duration}
                  </Text>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Text strong style={{ color: "#1890ff" }}>
                    Workouts per week:{" "}
                  </Text>
                  <Text style={{ color: "#323232" }}>
                    {currentProgram.daysPerWeek}
                  </Text>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Text strong style={{ color: "#1890ff" }}>
                    Description:{" "}
                  </Text>
                  <Text style={{ color: "#323232" }}>
                    {currentProgram.description}
                  </Text>
                </div>
              </Space>
            </Layout>
          )}

          {loadingMe || !currentProgram ? (
            <Row justify="center" style={{ paddingTop: "7%" }}>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 300 }}
                description={
                  <div
                    style={{
                      color: "#193381",
                      fontSize: "large",
                      fontWeight: "600",
                    }}
                  >
                    No programs created.
                    <br />
                    <br />
                    No time like the present...
                    <br />
                    <br />
                  </div>
                }
              />
            </Row>
          ) : (
            <>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Title level={3} style={{ color: "#1890ff" }}>
                  Workouts
                </Title>
              </div>
              <Title
                style={{ display: "flex", justifyContent: "center" }}
                level={4}
              >
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
                      classname="dashboard-card"
                      key={workout._id}
                      title={`Workout for Day ${index + 1}`}
                    >
                      <Row>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 16, offset: 0 }}
                          md={{ span: 12, offset: 6 }}
                          lg={{ span: 6, offset: 9 }}
                          xl={{ span: 6, offset: 9 }}
                        >
                          <Card
                            title={workout.name}
                            style={{ width: 300 }}
                            cover={
                              <img
                                alt="example"
                                src={`https://picsum.photos/seed/${workout._id}//300`}
                              />
                            }
                            actions={[
                              <Space direction="horizontal">
                                <Link to={`/startworkout/${workout._id}`}>
                                  <Button type="primary">Start</Button>
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
                className="dashboard-pagination"
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
        className="dashboard-button-row"
        justify="center"
        style={{ marginTop: "20px", marginBottom: "10%" }}
      >
        <Space direction="vertical">
          <Button
            type="primary"
            style={{
              padding: "20px",
              lineHeight: "0px",
              border: "5px solid",
              borderStyle: "outset",
              borderColor: "#fa6d35",
              borderRadius: "5px",
              background: "#193381",
              fontSize: "15px",
              fontWeight: "600",
              marginBottom: "10px"
            }}
            size="large"
            onClick={handleCreateProgramClick}
          >
            Create a Program!
          </Button>
        </Space>
      </Row>
    </Layout>
  );
};

export default Dashboard;