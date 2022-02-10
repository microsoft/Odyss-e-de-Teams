import React from "react";
import { Container } from "react-bootstrap";

interface IMainProps {
  hasGradient: boolean;
  children: any;
}

const Main = (props: IMainProps) => {
  const { hasGradient, children } = props;
  return (
    <Container
      fluid
      className={`${hasGradient ? "gradient " : ""}main-container d-flex p-0`}
    >
      {children}
    </Container>
  );
};
export default Main;
