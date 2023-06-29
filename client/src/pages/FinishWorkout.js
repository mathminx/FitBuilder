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
  Input,
  Rate,
} from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import "./styles/endWorkout.css";
const { Content } = Layout;
const { TextArea } = Input;

const { Meta } = Card;

function SaveWorkout() {
    const navigate = useNavigate();

    useEffect(() => {
      if (!Auth.loggedIn()) {
        navigate("/");
      }
    }, [navigate]);

  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <>
      <Row className="congratulations" justify="center">
        <h1>Great Job!</h1>
      </Row>
      <Row justify="center">
        <h2>How would you rate this workout?</h2>
      </Row>
      <Row justify="center">
        <Rate />
      </Row>
      <Row justify="center">
        <h2>How many minutes did your workout take?</h2>
        <Space className="howLong">
          <InputNumber
            defaultValue={60}
            min={0}
            max={1440}
            formatter={(value) => `${value}`}
            parser={(value) => value.replace("%", "")}
            onChange={onChange}
          />
        </Space>
      </Row>
      <Row justify="center">
        <h2>Notes?</h2>
        <TextArea rows={4} style={{ width: "90%" }} />
      </Row>
      <br></br>
      <Row justify="center">
        <Link to="/dashboard">
          <Button type="primary"> Save Workout </Button>
        </Link>
      </Row>
    </>
  );
}

export default SaveWorkout;
