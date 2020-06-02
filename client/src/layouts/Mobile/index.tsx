import React from "react";
import { Container } from "react-bootstrap";

import MenuMobile from "components/organisms/Menu/MenuMobile";

import "./style.scss";

interface IMobileProps {
  children: any;
}

const MobileLayout = (props: IMobileProps) => {
  const { children } = props;

  return (
    <Container fluid className={"main-container h-100 p-0 gradient"}>
      <MenuMobile />
      <div className="MobileLayout__content">{children}</div>
    </Container>
  );
};

export default MobileLayout;
