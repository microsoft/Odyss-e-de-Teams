import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Translation } from "react-i18next";

// atoms
import Title from "components/atoms/Title";

//molecules
import Explorer from "components/molecules/Widgets/Explorer";
import CampaignFollow from "components/molecules/Widgets/CampaignFollow";
import Planning from "components/molecules/Widgets/Planning";
import Rankings from "components/molecules/Widgets/Rankings";

// ressources
import AdminAPI from "api/Admin";
import ClassementAPI from "api/Classement";

// models
import { IUser } from "models/User";

export interface IAdminProps extends RouteComponentProps {
  dispatch: any;
}

interface IAdminState {
  explorers_count: number;
  loading: boolean;
  campaign: {
    name: string;
    date_end: string;
    has_campaign: boolean;
  };
  userRankingsPoints: IUser[];
  userRankingsExp: IUser[];
}

class AdminDashboard extends Component {
  state = {
    loading: true,
    explorers_count: 0,
    campaign: {
      name: "Lancement",
      date_end: "",
    },
    userRankingsPoints: [],
    userRankingsExp: [],
  };

  async componentDidMount() {
    try {
      const exploresCounts = await AdminAPI.getExplorersCount();
      const campainInfo = await AdminAPI.getCurrentCampaignInfo();
      let userRankingsPoints = await ClassementAPI.getClassement(
        "fr",
        "point",
        { limit: 3 }
      );
      let userRankingsXP = await ClassementAPI.getClassement("fr", "xp", {
        limit: 3,
      });
      this.setState({
        explorers_count: Number(exploresCounts.results.cnt_user),
        campaign: {
          has_campaign: campainInfo.results ? true : false,
          name: campainInfo.results ? campainInfo.results.mission_name : null,
          date_end:
            campainInfo.results && campainInfo.results.mission_end
              ? campainInfo.results.mission_end
              : null,
        },
        userRankingsExp: userRankingsXP,
        userRankingsPoints: userRankingsPoints,
        loading: false,
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { explorers_count, loading } = this.state;

    if (loading) return <div>Loading...</div>;
    else
      return (
        <>
          <Translation>
            {(t) => <Title className="mb-3" title={t("admin.title")} />}
          </Translation>

          <div className="col-12 row">
            <Explorer count={explorers_count} className="col-4 py-2" />

            <CampaignFollow
              campaign={this.state.campaign}
              className="col-7 offset-1 py-4"
              translationDescKey="admin.campaign_week_goal"
            />
          </div>

          <div className="col-12 row">
            <div className="Admin__sub__block">
              <div className="Admin__sub__block__left">
                <Planning
                  className=""
                  notificationsCount={3}
                  redirectLink={"/Planning"}
                />

                <Link to="/Outillage" className="no-underline-on-hover">
                  <div className="Admin__tools mt-4 d-flex py-3 justify-content-center">
                    <div className="Admin__tools__image d-flex justify-content-center align-items-center flex-column">
                      <img
                        src="/images/menu/outillage.png"
                        alt="outillage"
                        style={{
                          width: "70%",
                        }}
                      />
                    </div>

                    <div className="Admin__tools__content">
                      <div className="Admin__tools__content__title">
                        <Translation>{(t) => t("menu.outillage")}</Translation>
                      </div>
                      <div className="Admin__tools__content__description">
                        <Translation>
                          {(t) => t("admin.outillage_desc")}
                        </Translation>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="Admin__sub__block__right">
                <Link to="/Classement" className="no-underline-on-hover color-black1">
                  <Rankings
                    expRanks={this.state.userRankingsExp}
                    ptsRanks={this.state.userRankingsPoints}
                    className={"col-12 col-12 pl-4 pr-4 pt-4 pb-3"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </>
      );
  }
}

export default AdminDashboard;
