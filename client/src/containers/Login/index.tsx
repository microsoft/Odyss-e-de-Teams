import React from "react";
import { Container, Button } from "react-bootstrap";

import { WithTranslation, withTranslation } from "react-i18next";

import "./Login.scss";

interface ILoginProps {
  onLogin: any;
}

class Login extends React.Component<ILoginProps & WithTranslation, {}> {
  render() {
    const { onLogin, t, tReady } = this.props;

    return (
      <Container
        fluid
        className={`main-container h-100 d-flex flex-column align-items-center justify-content-center p-0`}
      >
        <div className="App-login px-3">
          <div className="App-login-image-container">
            <img
              src={
                process.env.PUBLIC_URL + "/images/logo/logo_centre_violet.png"
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
              <span className="label">{tReady && t("utils.login")}</span>
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default withTranslation()(Login);
