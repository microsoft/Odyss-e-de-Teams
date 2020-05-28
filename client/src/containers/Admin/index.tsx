import React, { Component } from "react";
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";
import { Translation } from "react-i18next";

import "./style.scss";

// layouts
import Main from "layouts/Main";

//containers
import Menu from "containers/Menu/Menu";

// components
import Header from "components/Header/Header";


// router
import AdminCockpit from "containers/Admin/Dashboard";

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
          <Switch>
            <Route exact path="/Cockpit" component={AdminCockpit} />
            <Route exact path="/Outillage" component={Outillage} />
            <Route component={AdminCockpit} />
          </Switch>
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
