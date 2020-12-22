import React from "react";
import { Container, Button } from "react-bootstrap";

import "./Login.scss";

interface ILoginProps {
  onLogin: any;
}

class Login extends React.Component<ILoginProps, {}> {
  render() {
    const { onLogin } = this.props;

    return (
      <Container
        fluid
        className={`main-container h-100 d-flex flex-column align-items-center justify-content-center p-0`}
      >
        <div className="App-login px-3">
          <div className="App-login-image-container">
            <img
              src={
                process.env.PUBLIC_URL + "/images/logo/fr/logo_centre_violet.png"
              }
              alt={"Logo"}
              className={"logo"}
            />
          </div>
          <div className="App-login-button-container text-center pb-4">
            <Button variant="primary" className={"d-inline-flex align-items-center"} onClick={() => onLogin()}>
              <img
                className="btn-ico mr-2"
                alt="Microsoft logo"
                src={
                  process.env.PUBLIC_URL + "/images/logo/microsoft.png"
                }
              />
              <span className="label">Se connecter</span>
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default Login;
