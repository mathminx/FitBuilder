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
      <Row justify="center">
        <h1>Good Job!!</h1>
      </Row>
      {/* Rate input */}
      <Row justify="center">
        <h2>How would you rate this workout?</h2>
      </Row>
      <Row justify="center">
        <Rate />
      </Row>
      {/* Time input */}
      <Row justify="center">
        <h2>How many minutes did your workout take?</h2>
        <Space>
          <InputNumber
            defaultValue={100}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            onChange={onChange}
          />
        </Space>
      </Row>
      {/* Notes section */}
      <Row justify="center">
        <h2>Notes?</h2>
        <TextArea rows={4} />
      </Row>
      {/* Save Workout */}
      <Row justify="center">
        <Link to='/dashboard'>
        <Button type="primary"> Save Workout </Button>
        </Link>
      </Row>
    </>
  );
}

export default SaveWorkout;
