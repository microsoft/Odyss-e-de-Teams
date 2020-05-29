import React from "react";
import { Container } from "react-bootstrap";

import MenuMobile from "components/organisms/Menu/MenuMobile";

interface IMobileProps {
  children: any;
}

const MobileLayout = (props: IMobileProps) => {
  const { children } = props;

  return (
    <Container fluid className={"main-container h-100 d-flex p-0 gradient"}>
      <MenuMobile />
      {children}
    </Container>
  );
};

export default MobileLayout;
