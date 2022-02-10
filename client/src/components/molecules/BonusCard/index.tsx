import React from "react";

import "./style.scss";
import { WithTranslation, withTranslation } from "react-i18next";

interface IBonusCard {
  locked: boolean;
  day: string;
  iconPath: string;
  bonusValue: number;
  description: string;
  current?: boolean;
  className?: string;
}

const BonusCard = (props: IBonusCard & WithTranslation) => {
  const {
    locked,
    day,
    iconPath,
    bonusValue,
    description,
    className,
    t,
    tReady,
    current,
  } = props;

  let displayLabel = "";
  if (locked) {
    displayLabel = t("player.cockpit.bonus.obtained");
  } else if (current) {
    displayLabel = t("player.cockpit.bonus.today");
  } else {
    displayLabel = t("player.cockpit.bonus.day") + " " + day;
  }

  return (
    <div
      className={`BonusCard ${className}  ${
        locked ? "BonusCard__locked" : ""
      } ${current ? "BonusCard__current" : ""}`}
    >
      <div className="BonusCard__container">
        <div className="BonusCard__container__body">
          <div className="BonusCard__container__body__icon">
            <img src={iconPath} alt="icon" />
          </div>

          <div className="BonusCard__container__body__value">
            <p className="BonusCard__container__body__value__value">
              + {bonusValue}
            </p>

            <p className="BonusCard__container__body__value__text">
              {" "}
              {tReady && t(description)}
            </p>
          </div>
        </div>
        <div className="BonusCard__container__footer">{displayLabel}</div>
      </div>
    </div>
  );
};

export default withTranslation()(BonusCard);
