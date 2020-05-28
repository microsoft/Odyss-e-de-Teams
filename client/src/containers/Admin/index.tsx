import React, { Component } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Translation } from "react-i18next";

import "./style.scss";

// layouts
import Main from "layouts/Main";

//containers
import Menu from "containers/Menu/Menu";

// components
import Header from "components/Header/Header";

// ressources
import AdminAPI from "api/Admin";
import ClassementAPI from "api/Classement";

// router
import AdminRouterBase from "containers/Admin/router";

import Outillage from "containers/Admin/Outillage";

// models
import { IUser } from "models/User";

import IStore from "store/IStore";

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

class Admin extends Component<IAdminProps> {
  render() {
    const hasGradiant = true;

    return (
      <Main hasGradient={hasGradiant}>
        <Menu currentRouterLink={this.props.location.pathname} />
        <div className={"main-content w-100 py-4 px-5"}>
          <div className={"mb-3"}>
            <Header hasGradient={hasGradiant} />
          </div>

          <Outillage />
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
