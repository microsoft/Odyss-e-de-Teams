import React from "react";

// atoms
import Counter from "components/atoms/Counter";

import "./style.scss";
import { WithTranslation, withTranslation } from "react-i18next";

interface ILaunchFollowWidgetProps {
  campaign: any;
  className?: string;
  translationDescKey: string;
}

const LaunchFollowWidget = (
  props: ILaunchFollowWidgetProps & WithTranslation
) => {
  const {
    campaign,
    className,
    translationDescKey,
    t,
    tReady,
  } = props;
  console.log(campaign);
  return (
    <div className={`LaunchFollowWidget ${className}`}>
      <div className="LaunchFollowWidget__background"></div>

      <div className="LaunchFollowWidget__container my-1">
        <div className="LaunchFollowWidget__container__title">
          {
            campaign.has_campaign ? (
              <>
                {tReady && t("admin.campaign_pending0")}{" "}
                &laquo; {campaign.name} &raquo;{" "}
                {tReady && t("admin.campaign_pending")}
              </>
            ) : (
              <>
                {tReady && t("admin.campaign_pending_nomission")}
              </>
            )
          }
        </div>

        <div className="LaunchFollowWidget__container__description">
          {tReady && t(translationDescKey)}
        </div>
        <div className="LaunchFollowWidget__container__timeleft">
          {
            campaign.has_campaign && (
              <>
                <span className="LaunchFollowWidget__container__timeleft__label color-white1">
                  {tReady && t("admin.campaign_time_left")}{" "}
                </span>{" "}
                <Counter
                  timeTillDate={campaign.date_end}
                  timeFormat="MM-DD-YYYY h:mm:ss"
                  className="LaunchFollowWidget__container__timeleft__timer color-white1"
                />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(LaunchFollowWidget);
