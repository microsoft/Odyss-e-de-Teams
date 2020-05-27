import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

import "./App.scss";

import Header from "components/Header/Header";

// containers
import Menu from "containers/Menu/Menu";
import Cockpit from "containers/Cockpit/Cockpit";
import Landing from "containers/Landing/index";
import Profil from "containers/Profil/Profil";
import Classement from "containers/Classement/Classement";

//layouts
import MainLayout from "layouts/Main";

import Admin from "containers/Admin";

import User from "api/User";

import IStore from "store/IStore";
import { IAppProps, IAppState } from "models/App";

class App extends React.Component<IAppProps, IAppState> {
  state = {
    logged: true,
    is_admin: true,
  };

  componentDidMount() {
    this._loadCurrentUser();
  }

  private _loadCurrentUser = () => {
    User.getUser("fr", "current").then((data) => {
      const action_liste = { type: "SET_CURRENT_USER", value: data };
      this.props.dispatch(action_liste);
    });
  };

  onCompleteLanding = () => {
    //to change later
    this.setState({
      logged: true,
    });
  };

  render() {
    // let hasGradient = this.props.location.pathname === "/Jouer" ? false : true;

    let hasGradient = false;

    const isMobile = window.innerWidth <= 768;

    const { logged, is_admin } = this.state;

    let toRender = null;

    if (!logged)
      toRender = (
        <Landing
          onCompleteLanding={this.onCompleteLanding}
          isMobile={isMobile}
        />
      );

    // admin
    if (logged && is_admin) {
      toRender = <Admin />;
    }

    // user
    if (logged && !is_admin) {
      toRender = (
        <Container
          fluid
          className={`${
            hasGradient ? "gradient" : ""
          } main-container h-100 d-flex p-0`}
        >
          <Menu currentRouterLink={this.props.location.pathname} />
          <div className={"main-content w-100 py-4 px-5"}>
            <div className={"mb-3"}>
              <Header hasGradient={hasGradient} />
            </div>
            <Switch>
              <Route exact path="/Cockpit">
                <Cockpit />
              </Route>
              <Route exact path="/Jouer">
                <p>Jouer container</p>
              </Route>
              <Route exact path="/Classement">
                <Classement />
              </Route>
              <Route exact path="/Profil">
                <Profil />
              </Route>
              <Route exact path="/Regles">
                <p>Regles container</p>
              </Route>
              <Route exact path="/Planning">
                <p>Planning container</p>
              </Route>
              <Route exact path="/Outillage">
                <p>Outillage container</p>
              </Route>
              <Route exact path="/Landing">
                <Landing
                  onCompleteLanding={this.onCompleteLanding}
                  isMobile={isMobile}
                />
              </Route>
            </Switch>
          </div>
        </Container>
      );
    }

    return toRender;
  }
}

const AppRouter = withRouter(App);
const mapStateToProps = (state: IStore) => {
  return {};
};
export default connect(mapStateToProps)(AppRouter);
