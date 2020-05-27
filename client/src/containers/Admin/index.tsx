import React, { Component } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
// import { Translation } from "react-i18next";

import "./style.scss";

// atoms
import Title from "components/atoms/Title";

//molecules
import Explorer from "components/molecules/Widgets/Explorer";
import CampaignFollow from "components/molecules/Widgets/CampaignFollow";
import Planning from "components/molecules/Widgets/Planning";
import Rankings from "components/molecules/Widgets/Rankings";

// layouts
import Main from "layouts/Main";

//containers
import Menu from "containers/Menu/Menu";

// components
import Header from "components/Header/Header";

// ressources
import AdminAPI from "api/Admin";
import ClassementAPI from "api/Classement";

// models
import { IUser } from "models/User";

import IStore from "../../store/IStore";

export interface IAdminProps extends RouteComponentProps {
  dispatch: any;
}

interface IAdminState {
  explorers_count: number;
  loading: boolean;
  campaign: {
    name: string;
    date_end: string;
  };
  userRankingsPoints: IUser[];
  userRankingsExp: IUser[];
}

class Admin extends Component<IAdminProps, IAdminState> {
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
      let userRankingsPoints = await ClassementAPI.getClassement("fr", "point");
      let userRankingsXP = await ClassementAPI.getClassement("fr", "xp");

      this.setState({
        explorers_count: Number(exploresCounts.results.cnt_user),
        campaign: {
          name: campainInfo.results.mission_name,
          date_end: new Date(
            campainInfo.results.mission_end.replace(" ", "T")
          ).toString(),
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
    const hasGradiant = true;

    const { explorers_count, loading } = this.state;

    if (loading) return <div>Loading...</div>;
    else
      return (
        <Main hasGradient={hasGradiant}>
          <Menu currentRouterLink={this.props.location.pathname} />
          <div className={"main-content w-100 py-4 px-5"}>
            <div className={"mb-3"}>
              <Header hasGradient={hasGradiant} />
            </div>

            <Title className="mb-3" title="Bienvenue à bord, Commandant !" />

            <div className="col-12 row">
              <Explorer count={explorers_count} className="col-4 py-4" />

              <CampaignFollow
                campaign_name={this.state.campaign.name}
                campaign_end={this.state.campaign.date_end}
                className="col-7 offset-1 py-4"
              />
            </div>

            <div className="col-12 row py-4">
              <Planning
                className="col-6"
                notificationsCount={3}
                redirectLink={"/Planning"}
              />

              <Rankings
                expRanks={this.state.userRankingsExp}
                ptsRanks={this.state.userRankingsPoints}
                className={"col-6"}
              />
            </div>

            <Link to="/Outillage" className="no-underline-on-hover">
              <div className="Admin__tools">
                <div className="Admin__tools__image">
                  <img src="/images/menu/outillage.svg" alt="outillage" />
                </div>

                <div className="Admin__tools__content">
                  <div className="Admin__tools__content__title">Outillage</div>
                  <div className="Admin__tools__content__description">
                    Configuration et paramètres
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Main>
      );
  }
}

const AdminRouter = withRouter(Admin);
const mapStateToProps = (state: IStore) => {
  return {};
};
export default connect(mapStateToProps)(AdminRouter);
