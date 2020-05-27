import React from "react";

// atoms
import Counter from "components/atoms/Counter";

import "./style.scss";
import { WithTranslation, withTranslation } from "react-i18next";

interface ILaunchFollowWidgetProps {
  campaign_end: string;
  campaign_name: string;
  className?: string;
}

const LaunchFollowWidget = (
  props: ILaunchFollowWidgetProps & WithTranslation
) => {
  const { campaign_name, campaign_end, className, t, tReady } = props;

  return (
    <div className={`LaunchFollowWidget ${className}`}>
      <div className="LaunchFollowWidget__background"></div>

      <div className="LaunchFollowWidget__container">
        <div className="LaunchFollowWidget__container__title">
          &laquo; {campaign_name} &raquo;{" "}
          {tReady && t("admin.campaign_pending")}
        </div>

        <div className="LaunchFollowWidget__container__description col-8">
          {tReady && t("admin.campaign_week_goald")} &laquo; {campaign_name}{" "}
          &raquo;
        </div>

        <div className="LaunchFollowWidget__container__timeleft col-8">
          <span className="LaunchFollowWidget__container__timeleft__label">
            {tReady && t("admin.campaign_time_left")}{" "}
          </span>{" "}
          <Counter
            timeTillDate={campaign_end}
            timeFormat="MM-DD-YYYY h:mm:ss"
            className="LaunchFollowWidget__container__timeleft__timer"
          />
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(LaunchFollowWidget);
