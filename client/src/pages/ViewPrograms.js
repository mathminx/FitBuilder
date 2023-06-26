import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, theme, Card, Button, Space, Avatar, Col, Divider, Row  } from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth"
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

  const handleViewSinglePrograms = (event) => {
    console.log('button clicked');
     if (Auth.loggedIn()) {
        const programId = event.target.value;
         navigate(`/programs/${programId}`); // Redirect to dashboard if logged in.
     } else {
      navigate('/')
     }
   };

   useEffect(() => {
    if (!loadingMe && dataMe) {
      setAllPrograms(dataMe.program);
    }
  }, [loadingMe, dataMe]);
    return (
        <>
         <Divider orientation="left">Users Programs</Divider>
    <Row gutter={16} justify="center">
      <Col className="gutter-row" span={6}>
      <div style={style} >All Programs</div>
      </Col>
    </Row>
    <Divider orientation="left"></Divider>
    <Row gutter={16} justify="center">
      <Col className="gutter-row" span={6}>
        { loadingMe || !allPrograms ? (
        <div>Waiting for Programs</div>
        ) : (
            allPrograms.map((program) => (
      <Card
      key={program._id}
    style={{ width: 300 }}
    cover={
        /* program picture */
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
        <Button type="primary" onClick={() => handleViewSinglePrograms(program._id)}>View Program</Button>
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title={program.title}
      description={program.description}
    />
  </Card>
            ))
        )}
      </Col>
    </Row>
  </>
    )
}

export default ViewPrograms
   
