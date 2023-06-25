import React from "react";
import AvatarIcon from "./AvatarIcon.js";
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
const { Header, Content, Footer } = Layout;

const { Meta } = Card;

const DashboardHeader = () => {
  // place components in here
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <div>
          actions=
          {[
            <Space direction="horizontal" size={850}>
              <Button type="primary">View All programs</Button>
              <Row justify="end">
                <Avatar size={64} icon={<UserOutlined />}/>
              </Row>
            </Space>,
          ]}
        </div>
      </Header>
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
          <Breadcrumb.Item>Current Program:{/*programname*/}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {" "}
          {/* number of cards changes depending on number of workouts per week in program */}
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
                      <Button type="primary">Start</Button>
                      <Button type="secondary">View</Button>
                    </Space>,
                  ]}
                >
                  <Meta title="Squat DAY" description="Day of Squats" />
                </Card>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Card
                  title="Day 2"
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
                      <Button type="primary">Start</Button>
                      <Button type="secondary">View</Button>
                    </Space>,
                  ]}
                >
                  <Meta title="Chest DAY" description="Day of Chests" />
                </Card>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Card
                  title="Day 3"
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
                      <Button type="primary">Start</Button>
                      <Button type="secondary">View</Button>
                    </Space>,
                  ]}
                >
                  <Meta title="Leg DAY" description="Day of Legs" />
                </Card>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Card
                  title="Day 4"
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
                      <Button type="primary">Start</Button>
                      <Button type="secondary">View</Button>
                    </Space>,
                  ]}
                >
                  <Meta title="Squat DAY" description="Day of Squats" />
                </Card>
              </Col>
            </Row>
            <Row justify="end">
              <Space direction="horizontal">
                <Button type="secondary">Next Week</Button>
              </Space>
            </Row>
          </Card>
        </div>
      </Content>
      <Row justify="center" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Space direction="vertical">
          <Button type="primary" size="large">
            Create Program!
          </Button>
        </Space>
      </Row>
    </Layout>
  );
};

export default DashboardHeader;
