import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import { Button } from "react-bootstrap";

import "./style.scss";

interface MissionItem {
  date_start: string;
  date_end: string;
  mission_started: boolean;
  mission_title: string;
  mission_number: number;
  mission_description: string;
  onMissionClick?: void;
  className?: string;
}

const MissionItem = (props: MissionItem & WithTranslation) => {
  const {
    tReady,
    t,
    mission_number,
    date_start,
    date_end,
    mission_started,
    mission_title,
    mission_description,
    className,
  } = props;

  return (
    <div className={`MissionItem ${className || ""}`}>
      <div className="MissionItem__header">
        {tReady &&
          `${t(
            "admin.planning.mission_week_short"
          )}${mission_number} : ${date_start} ${t(
            "admin.planning.mission_week_to"
          )} ${date_end}`}
      </div>

      <div className="MissionItem__body">
        <div className="MissionItem__body__title">
          <p>{tReady && t("admin.planning.mission_label")}</p>
          <p>&laquo; {mission_title} &raquo;</p>
        </div>

        <div className="MissionItem__body__desc">{mission_description}</div>
      </div>

      <div className="MissionItem__footer">
        {mission_started ? (
          <Button variant="primary">
            {tReady && t("admin.planning.mission_active")}
          </Button>
        ) : (
          <Button variant="secondary">
            {tReady && t("admin.planning.mission_pending")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default withTranslation()(MissionItem);
