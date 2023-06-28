import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_PROGRAM } from "../../utils/mutations";
import Auth from "../../utils/auth";

const { TextArea } = Input;

const CreateProgram = () => {
  const [title, setTitle] = useState("");
  const [weeks, setWeeks] = useState(1);
  const [days, setDays] = useState(1);
  const [description, setDescription] = useState("");

  const [addProgram, { loading, error }] = useMutation(ADD_PROGRAM);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

    const handleFormSubmit = async () => {
    try {
        await addProgram({
        variables: { title, daysPerWeek: days, duration: weeks, description },
        });
        navigate("/viewallprograms");
    } catch (error) {
        console.error("Error occurred during the mutation:", error);
    }
    };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "80%" }}>
        {" "}
        {/* Added this div */}
        <Form onFinish={handleFormSubmit}>
          <h1>Create Program</h1>

          <Form.Item label="Title">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>

          <Form.Item label="Weeks">
            <InputNumber
              min={1}
              value={weeks}
              onChange={(value) => setWeeks(value)}
            />
          </Form.Item>

          <Form.Item label="Days per Week">
            <InputNumber
              min={1}
              value={days}
              onChange={(value) => setDays(value)}
            />
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => navigate("/viewallprograms")}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Program
            </Button>
          </Form.Item>

          {error && <p>Error: {error.message}</p>}
        </Form>
      </div>{" "}
      {/* End of added div */}
    </div>
  );
};

export default CreateProgram;
