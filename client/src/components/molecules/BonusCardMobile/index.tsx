import React from "react";

import "./style.scss";
import { WithTranslation, withTranslation } from "react-i18next";

interface IBonusCardMobile {
  locked: boolean;
  day: string;
  iconPath: string;
  bonusValue: number;
  description: string;
  current?: boolean;
  className?: string;
}

const BonusCardMobile = (props: IBonusCardMobile & WithTranslation) => {
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

  console.log(props);

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
      className={`BonusCardMobile ${className}  ${
        locked ? "BonusCardMobile__locked" : ""
      } ${current ? "BonusCardMobile__current" : ""}`}
    >
      <div className="BonusCardMobile__container col-12">
        <div className="BonusCardMobile__container__day col-3">
          {displayLabel}
        </div>
        <div className="BonusCardMobile__container__icon col-4">
          <img src={iconPath} alt="icon" />
        </div>

        <div className="BonusCardMobile__container__value col-5">
          <p className="BonusCardMobile__container__value__value">
            + {bonusValue}
          </p>

          <p className="BonusCardMobile__container__value__text">
            {" "}
            {tReady && t(description)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(BonusCardMobile);
