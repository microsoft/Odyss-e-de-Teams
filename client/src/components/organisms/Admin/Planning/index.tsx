import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import MissionItem from "components/molecules/Admin/MissionItem";

import "./style.scss";

interface IPlanning {
  missions: any;
}

const Planning = (props: IPlanning & WithTranslation) => {
  const { t, tReady, missions } = props;

  console.log(props);

  const activeMissionIndex = missions.findIndex((m) => m.actif === true);

  console.log(missions[activeMissionIndex]);

  return (
    <div className="PlanningComponent">
      <div className="PlanningComponent__title">
        {tReady &&
          `${t("admin.planning.title")} ${t("admin.planning.title_week")} ${
            activeMissionIndex + 1
          } : « ${missions[activeMissionIndex].nom}	! »`}
      </div>

      <div className="PlanningComponent__subtitle">
        {tReady && t("admin.planning.description")}
      </div>
      <div className="PlanningComponent__missions col-12 p-4">
        {missions.map((mission, index) => (
          <MissionItem
            key={`mission-${index}`}
            mission_number={index + 1}
            date_start={mission.debut_semaine}
            date_end={mission.fin_semaine}
            mission_started={mission.actif}
            mission_title={mission.nom}
            mission_description={mission.description}
            className="col-3 m-1"
          />
        ))}
      </div>
    </div>
  );
};

export default withTranslation()(Planning);
