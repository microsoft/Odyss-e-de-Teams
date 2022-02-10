import React from "react";
import { Container, Spinner } from "react-bootstrap";

import { WithTranslation, withTranslation } from "react-i18next";

import "./Loading.scss";

class LoadingContainer extends React.Component<WithTranslation,{}, {}> {
  render() {
    const {
      t,
      tReady
    } = this.props;
    return (
      <Container
        fluid
        className={`main-container h-100 d-flex flex-column align-items-center justify-content-center p-0`}
      >
        <div className="App-loading p-2 d-flex align-items-center">
          <Spinner animation="grow" variant="primary" size="sm" />
          <p className={" ml-2 mb-0"}>{tReady && t("utils.loading")}</p>
        </div>
      </Container>
    );
  }
}

export default withTranslation()(LoadingContainer);
