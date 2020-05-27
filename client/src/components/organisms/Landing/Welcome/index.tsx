import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

import "./style.scss";

const Welcome = (props) => {
  const { t, isMobile } = props;

  return (
    <div className="Welcome d-flex h-100 flex-column justify-content-center px-5">
      <h1>{t("landing.welcome.text")}</h1>
      <div className="Welcome__logo mt-4 mb-5">
        <img src="/images/logo/logo_gauche_blanc.png" alt="logo" />
      </div>

      <h3 className="Welcome__body mb-4 mt-3">
        {isMobile
          ? t("landing.welcome.body-mobile")
          : t("landing.welcome.body")}
      </h3>
      <Button
        variant="light"
        className={`d-inline-block py-3 py-md-2 mt-4 mt-md-2 ${
          isMobile ? "btn__orange-gradiant" : ""
          }`}
        onClick={props.onClickNext}>
        {t("landing.welcome.buttonText")}
      </Button>
    </div>
  );
};

export default withTranslation()(Welcome);
