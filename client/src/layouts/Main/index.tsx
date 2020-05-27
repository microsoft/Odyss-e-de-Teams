import React, { Component } from "react";
import { Container } from "react-bootstrap";

interface IMainProps {
  hasGradient: boolean;
  children: any;
}

class Main extends Component<IMainProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { hasGradient, children } = this.props;
    return (
      <Container
        fluid
        className={`${
          hasGradient ? "gradient" : ""
        } main-container h-100 d-flex p-0`}
      >
        {children}
      </Container>
    );
  }
}

export default Main;
