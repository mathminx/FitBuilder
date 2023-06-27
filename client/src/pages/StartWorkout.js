import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, theme, Card, Button, Space, Row, Col, Progress } from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
const { Content } = Layout;

const { Meta } = Card;

function StartWorkout() {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentProgram, setCurrentProgram] = useState(null);
  const navigate = useNavigate();

  return (
    <>
    <Row >
    <Progress percent={10}/>
    </Row>
      <Row gutter={[8, 16]}>
        <Col span={8} />
        <Col span={8} />
        <Col span={8} />
      </Row>
    </>
  );
}
export default StartWorkout;
