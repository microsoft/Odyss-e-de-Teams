import React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import "./style.scss";

interface ILinks {
  className?: string;
  iconPath: string;
  i18nTitleKey: string;
  i18nDescriptionKey: string;
}

const Links = (props: ILinks & WithTranslation) => {
  const {
    t,
    tReady,
    className,
    iconPath,
    i18nTitleKey,
    i18nDescriptionKey,
  } = props;

  return (
    <div className={`Links ${className || ""}`}>
      <div className="Links__container col-12 p-2">
        <div className="Links__container__icone">
          <img src={iconPath} alt="icone" />
        </div>

        <div className="Links__container__text">
          <div className="Links__container__text__title">
            {tReady && t(i18nTitleKey)}
          </div>
          <div className="Links__container__text__descrption">
            {tReady && t(i18nDescriptionKey)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Links);
