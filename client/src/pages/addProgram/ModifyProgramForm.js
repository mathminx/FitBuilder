import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_PROGRAM, UPDATE_PROGRAM } from "../../utils/mutations";
import { GET_SINGLE_PROGRAM } from "../../utils/queries";
import Auth from "../../utils/auth";

const { TextArea } = Input;

const ModifyProgram = () => {

const { programId } = useParams();

const {
  loading: queryLoading,
  error: queryError,
  data,
} = useQuery(GET_SINGLE_PROGRAM, { variables: { id: programId } });


  const [title, setTitle] = useState("");
  const [weeks, setWeeks] = useState(1);
  const [days, setDays] = useState(1);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data?.program) {
      setTitle(data.program.title);
      setWeeks(data.program.duration);
      setDays(data.program.daysPerWeek);
      // Assuming you have a description field in your program data
      // setDescription(data.program.description || "");
      setDescription(data.program.description);
    }
  }, [data]);

  const [updateProgram, { loading, error }] = useMutation(UPDATE_PROGRAM);
  const navigate = useNavigate();

    useEffect(() => {
      if (!Auth.loggedIn()) {
        navigate("/");
      }
    }, [navigate]);

    if (queryLoading) return <p>Loading...</p>;
    if (queryError) return <p>Error! {queryError.message}</p>;

    const handleFormSubmit = async () => {
    try {
        await updateProgram({
        variables: { programId: programId, title, daysPerWeek: days, duration: weeks, description },
        });
        console.log(`programID: ${programId}`);
        console.log(`Description: ${description}`);
        navigate(`/programs/${programId}`);
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
          <h1>Update Program</h1>

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

          <Form.Item label="Workouts per Week">
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
              onClick={() => navigate(`/programs/${programId}`)}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>

          {error && <p>Error: {error.message}</p>}
        </Form>
      </div>{" "}
      {/* End of added div */}
    </div>
  );
};

export default ModifyProgram;
