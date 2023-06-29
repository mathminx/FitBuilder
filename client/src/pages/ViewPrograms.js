import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, theme, Card, Button, Space, Avatar, Col, Divider, Row  } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth"
import "./styles/viewPrograms.css";
const { Content } = Layout;

const { Meta } = Card;

const style = {
    background: '#0092ff',
    padding: '8px 0',
  };

const ViewPrograms = () => {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [allPrograms, setAllPrograms] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleViewSinglePrograms = (programId) => {
    console.log('button clicked');
     if (Auth.loggedIn()) {
         navigate(`/programs/${programId}`); // Redirect to dashboard if not logged in.
     } else {
      navigate('/')
     }
   };

   useEffect(() => {
    if (!loadingMe && dataMe) {
      setAllPrograms(dataMe.me.programs);
    }
  }, [loadingMe, dataMe]);
    return (
      <>
        <Divider className="userPrograms" orientation="left">
          User Programs
        </Divider>
        <Row gutter={16} justify="start" style={{ paddingLeft: "45px" }}>
          <Col className="gutter-row" span={6}>
            <Button type="primary" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <div className="containerClass">
          <Row className="programRow" gutter={16} justify="center">
            <Col
              className="gutter-row"
              span={6}
              style={{ paddingBottom: "60px" }}
            >
              {loadingMe || !allPrograms ? (
                <div>Loading Programs</div>
              ) : (
                allPrograms.map((program) => (
                  <Card
                    key={program._id}
                    style={{ width: 300 }}
                    cover={
                      <img
                        alt="example program"
                        src={`https://picsum.photos/seed/${program._id}/300/300`}
                      />
                    }
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => handleViewSinglePrograms(program._id)}
                      >
                        View Program
                      </Button>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                      }
                      title={program.title}
                      description={program.description}
                    />
                  </Card>
                ))
              )}
            </Col>
          </Row>
        </div>
      </>
    );
}

export default ViewPrograms
   
