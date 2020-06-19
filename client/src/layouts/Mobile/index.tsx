import React from "react";
import { Container } from "react-bootstrap";

import MenuMobile from "components/organisms/Menu/MenuMobile";

import "./style.scss";

interface IMobileProps {
  children: any;
  currentRouterLink: string;
}

const MobileLayout = (props: IMobileProps) => {
  const { children, currentRouterLink } = props;
  let backgroundClass: string = "overlay-purple";
  if (currentRouterLink.indexOf("/Cockpit") !== -1) {
    backgroundClass = "gradient";
  } else if (currentRouterLink.indexOf("/Regles") !== -1) {
    backgroundClass = "overlay-mauve";
  }
  return (
    <Container fluid className={`main-container p-0 ${backgroundClass}`}>
      <MenuMobile currentRouterLink={currentRouterLink} />
      <div className="MobileLayout__content px-3 pb-3">{children}</div>
    </Container>
  );
};

export default MobileLayout;
