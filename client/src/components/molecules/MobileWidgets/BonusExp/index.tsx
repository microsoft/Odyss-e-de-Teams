import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import "./style.scss";

interface IBonusEXP {
  className?: string;
  bonus: number;
  bonusDesc: string;
}

const BonusEXP = (props: IBonusEXP & WithTranslation) => {
  const { t, tReady, className, bonus, bonusDesc } = props;

  return (
    <div className={`BonusEXP ${className || ""}`}>
      <div className="BonusEXP__container col-12 row p-0 m-0">
        <div className="BonusEXP__container__img col-4">
          <img
            src="/images/rewards/exp-bonus.png"
            className="BonusEXP__container__img__first"
            alt="bonus"
          />
          <img
            src="/images/rewards/exp-bonus.png"
            className="BonusEXP__container__img__second"
            alt="bonus"
          />
        </div>

        <div className="BonusEXP__container__content col-8">
          <div className="BonusEXP__container__content__bonus">
            + {bonus} {tReady && t(`player.cockpit.bonus.${bonusDesc}`)}
          </div>

          <div className="BonusEXP__container__content__text">
            {tReady && t("player.cockpit.exp_daily_bonus")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(BonusEXP);
