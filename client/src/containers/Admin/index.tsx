import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
// import { Translation } from "react-i18next";

// atoms
import Title from "components/atoms/Title";

//molecules
import Explorer from "components/molecules/Widgets/Explorer";
import CampaignFollow from "components/molecules/Widgets/CampaignFollow";

// layouts
import Main from "layouts/Main";

//containers
import Menu from "containers/Menu/Menu";

// components
import Header from "components/Header/Header";

// ressources
import AdminAPI from "api/Admin";

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
}

class Admin extends Component<IAdminProps, IAdminState> {
  state = {
    loading: true,
    explorers_count: 0,
    campaign: {
      name: "Lancement",
      date_end: "",
    },
  };

  async componentDidMount() {
    try {
      let exploresCounts = await AdminAPI.getExplorersCount();
      let campainInfo = await AdminAPI.getCurrentCampaignInfo();

      this.setState({
        explorers_count: Number(exploresCounts.results.cnt_user),
        campaign: {
          name: campainInfo.results.mission_name,
          date_end: new Date(
            campainInfo.results.mission_end.replace(" ", "T")
          ).toString(),
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const hasGradiant = true;

    const { explorers_count } = this.state;

    console.log(this.state);
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
