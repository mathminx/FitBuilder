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
  InputNumber
} from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
const { Content } = Layout;

const { Meta } = Card;

function StartWorkout() {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentProgram, setCurrentProgram] = useState(null);
  const navigate = useNavigate();

  const onChange = (number) => {
    console.log('changed', number);
  };

  return (
    <>
      <Row>
        <Progress percent={10} />
      </Row>
      <Row justify="center">
      <Space direction="vertical" size={16}>
    <Card title="A1 Deadlifts" extra={<a href="#">More</a>} style={{ width: 500}}>
      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
    </Card>
    </Space>
    </Row>
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
      <Row gutter={[8, 16]} justify="space-evenly">
        <Col span={8}>
          <div justify="center">1</div>
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
    </>
  );
}
export default StartWorkout;
