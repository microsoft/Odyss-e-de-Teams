import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";
import i18n from '../../../config/i18n';

import { Tabs, Tab } from "react-bootstrap";

import AdminAPI from "api/Admin";

import { getFullMonth } from "utils/dates";

import AdminPlanning from "components/organisms/Admin/Planning";
import AdminAgenda from "components/organisms/Admin/Agenda";
import AdminEmailing from "components/organisms/Admin/Emailing";
import AdminSocial from "components/organisms/Admin/Social";
import AdminNotification from "components/organisms/Admin/Notification";

import "./style.scss";

interface IPlanningContainerState {
  loading: boolean;
  campaigns: any;
  agenda: any;
  curTabKey: string;
}

class PlanningContainer extends React.Component<
  WithTranslation,
  IPlanningContainerState
> {
  state = {
    loading: true,
    campaigns: [],
    agenda: [],
    curTabKey: "PLANNING",
  };

  async componentDidMount() {
    try {
      const missions = await AdminAPI.getAllCampaigns(i18n.language);

      missions.availableMissions.forEach((mission) => {
        let startDate = new Date(mission.debut_semaine);
        let endDate = new Date(mission.fin_semaine);

        mission.debut_semaine = `${startDate.getDate()} ${this.props
          .t(getFullMonth(startDate))
          .toLowerCase()}`;

        mission.fin_semaine = `${endDate.getDate()} ${this.props
          .t(getFullMonth(endDate))
          .toLowerCase()}`;
      });

      this.setState({
        campaigns: missions.availableMissions,
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  activateMission = async (mission: any) => {
    await AdminAPI.setCurrentMission({
      id_semaine: mission.id_semaine,
    });
    this.componentDidMount();
  };

  private _setCurrentTab = (key) => {
    this.setState({
      curTabKey: key,
    });
  };

  render() {
    const { t, tReady } = this.props;
    const { loading, campaigns } = this.state;

    if (loading) return <div> Loading ...</div>;
    else
      return (
        <div className="PlanningContainer">
          <div className="PlanningContainer__subtitle">
            <h1>{tReady && t("admin.planning.subtitle")}</h1>
          </div>

          <div className="PlanningContainer__container col-12 main-encart">
            <div className="PlanningContainer__container__title">
              <h2>{tReady && t("admin.planning.board_title")}</h2>
              <p>{tReady && t("admin.planning.board_desc")}</p>
            </div>

            <div className="PlanningContainer__container__planning">
              <Tabs
                id="controlled-tab-planning"
                activeKey={this.state.curTabKey}
                onSelect={(k) => this._setCurrentTab(k)}
                className="PlanningContainer__container__planning__tabs"
              >
                <Tab
                  eventKey="PLANNING"
                  title={t("admin.planning.menu_planning")}
                  className="PlanningContainer__container__planning__tabs__item"
                >
                  <AdminAgenda />
                </Tab>

                <Tab eventKey="EMAIL" title={t("admin.planning.menu_email")}>
                  <AdminEmailing />
                </Tab>

                <Tab eventKey="SOCIAL" title={t("admin.planning.menu_social")}>
                  <AdminSocial
                  />
                </Tab>

                <Tab
                  eventKey="NOTIFICATION"
                  title={t("admin.planning.menu_teams")}
                >
                  <AdminNotification/>
                </Tab> 
               {/*  TODO: en attendant que le push notif marche bien */}

                <Tab
                  eventKey="MISSION"
                  title={t("admin.planning.menu_missions")}
                >
                  <AdminPlanning
                    missions={campaigns}
                    onMissionActivate={this.activateMission}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      );
  }
}

export default withTranslation()(PlanningContainer);
