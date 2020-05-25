import React from "react";
import { withTranslation } from "react-i18next";

import Button from "components/atoms/Button/Button";

import "./style.scss";

const Welcome = (props) => {
  const { t, isMobile } = props;

  return (
    <div className="Welcome col-12">
      <span className="Welcome__heading">{t("landing.welcome.text")}</span>
      <div className="Welcome__logo">
        <img src="/images/logo/logo_gauche_blanc.png" alt="logo" />
      </div>

      <span className="Welcome__body">
        {isMobile
          ? t("landing.welcome.body-mobile")
          : t("landing.welcome.body")}
      </span>
      <Button
        text={t("landing.welcome.buttonText")}
        className={`Welcome__button ${
          isMobile ? "Button__orange-gradiant" : "Button__white"
        } col-sm-3 col-10`}
        onClickAction={props.onClickNext}
      />
    </div>
  );
};

export default withTranslation()(Welcome);
