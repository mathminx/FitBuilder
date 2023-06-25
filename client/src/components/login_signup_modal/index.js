import React, { useState } from "react";
import { Button, Modal } from "antd";
import Login from "../login/index";
import Signup from "../signup/index";

const LoginSignupModal = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setModal1Open(true)}>
        Login
      </Button>
      <Modal
        title="Login"
        style={{ top: 20 }}
        visible={modal1Open} // changed from open to visible
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <Login /> // Here we include the Login form
      </Modal>
      <br />
      <br />
      <Button type="primary" onClick={() => setModal2Open(true)}>
        Signup
      </Button>
      <Modal
        title="Signup"
        centered
        visible={modal2Open} // changed from open to visible
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <Signup /> // Here we include the Signup form
      </Modal>
    </>
  );
};

export default LoginSignupModal;
