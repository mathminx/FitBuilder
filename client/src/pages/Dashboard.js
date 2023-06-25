import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Card,
  Avatar,
  Button,
  Space,
  Row,
  Col,
} from "antd";
import { useQuery } from "@apollo/client";
import {
  GET_SINGLE_PROGRAM,
  GET_ME,
  GET_SINGLE_WORKOUT,
} from "../utils/queries";
const { Header, Content, Footer } = Layout;

const { Meta } = Card;

const Dashboard = () => {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const { loading: loadingSingleProgram, data: dataSingleProgram } =
    useQuery(GET_SINGLE_PROGRAM);

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
          {" "}
          {loadingSingleProgram ? (
            <Breadcrumb.Item>Loading....</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              Current Program:{/*dataSingleProgram.name*/}
            </Breadcrumb.Item>
          )}
          <Link to="/programs">
            <Breadcrumb.Item>View all Programs</Breadcrumb.Item>
          </Link>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {" "}
          {/* number of cards changes depending on number of workouts per week in program */}
          {loadingSingleProgram ? (
            <Card> Loading Workouts </Card>
          ) : (
            <Card title="Workouts For the Week">
              <Row>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                  <Card
                    title="Day 1"
                    style={{
                      width: 300,
                    }}
                    /* Image of workout / program */
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <Space direction="horizontal">
                        <Link to="/startworkout/:workoutId">
                          <Button type="primary">Start</Button>
                        </Link>
                        <Link to="/">
                        <Button type="secondary">View</Button>
                        </Link>
                      </Space>,
                    ]}
                  >
                    <Meta title="Squat DAY" description="Day of Squats" />
                  </Card>
                </Col>
              </Row>

              <Row justify="end">
                <Space direction="horizontal">
                  <Link to="/">
                    <Button type="secondary">Next Week</Button>
                  </Link>
                </Space>
              </Row>
            </Card>
          )}
        </div>
      </Content>
      <Row justify="center" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Space direction="vertical">
          <Link to="/createprogram">
            <Button type="primary" size="large">
              Create Program!
            </Button>
          </Link>
        </Space>
      </Row>
    </Layout>
  );
};

export default Dashboard;

// export
