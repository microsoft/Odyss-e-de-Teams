import React from "react";
import { WithTranslation, withTranslation, Trans } from "react-i18next";

import Counter from "components/atoms/Counter";

import "./style.scss";

interface ICampaignFollow {
  className?: string;
  timerEnd: string;
  campaignName: string;
}

const CampaignFollowMobile = (props: ICampaignFollow & WithTranslation) => {
  const { t, tReady, className, timerEnd, campaignName } = props;

  return (
    <div className={`CampaignFollow ${className || ""}`}>
      <div className="CampaignFollow__container col-12 p-4">
        <div className="CampaignFollow__container__title">
          {tReady && t("player.cockpit.mobile_mission_title")}« {campaignName} »{" "}
          {tReady && t("player.cockpit.mobile_mission_pending")}
        </div>

        <div className="CampaignFollow__container__text pt-4">
          <Trans i18nKey="player.cockpit.campaign_desc">
            Cumulez des points au classement en répondant chaque semaine aux
            nouveaux modules de questions Teams et tentez de remporter un
            <strong>Surface Headphone</strong> d'une valeur de 300,00 euros et
            de nombreux cadeaux !
          </Trans>
        </div>

        <div className="CampaignFollow__container__timer pt-4">
          <span className="LaunchFollowWidget__container__timeleft__label">
            {tReady && t("admin.campaign_time_left")}{" "}
          </span>{" "}
          <Counter
            timeTillDate={timerEnd}
            timeFormat="MM-DD-YYYY h:mm:ss"
            className="LaunchFollowWidget__container__timeleft__timer"
          />
          <div className="CampaignFollow__container__timer__icon col-7">
            <img src="/images/icone/chest-coins.png" alt="chest-coin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(CampaignFollowMobile);
