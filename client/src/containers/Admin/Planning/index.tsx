import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import { Tabs, Tab } from "react-bootstrap";

import AdminAPI from "api/Admin";

import "./style.scss";

interface IPlanningContainerState {
  loading: boolean;
  campaigns: any;
  curTabKey: string;
}

class PlanningContainer extends React.Component<
  WithTranslation,
  IPlanningContainerState
> {
  state = {
    loading: false,
    campaigns: [],
    curTabKey: "PLANNING",
  };

  async componentDidMount() {
    try {
      const missions = await AdminAPI.getAllCampaigns();
      console.log(missions);
      this.setState({
        campaigns: missions.availableMissions,
      });
    } catch (err) {
      console.error(err);
    }
  }

  private _setCurrentTab = (key) => {
    this.setState({
      curTabKey: key,
    });
  };

  render() {
    const { t, tReady } = this.props;
    const { loading } = this.state;

    if (loading) return <div> Loading ...</div>;
    else
      return (
        <div className="PlanningContainer">
          <div className="PlanningContainer__subtitle">
            <h1>{tReady && t("admin.planning.subtitle")}</h1>
          </div>

          <div className="PlanningContainer__container col-12">
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
                  Planning
                </Tab>

                <Tab eventKey="EMAIL" title={t("admin.planning.menu_email")}>
                  Email
                </Tab>

                <Tab eventKey="SOCIAL" title={t("admin.planning.menu_social")}>
                  Social
                </Tab>

                <Tab eventKey="TEAMS" title={t("admin.planning.menu_teams")}>
                  notification teams
                </Tab>

                <Tab
                  eventKey="MISSION"
                  title={t("admin.planning.menu_missions")}
                >
                  Missions
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      );
  }
}

export default withTranslation()(PlanningContainer);
