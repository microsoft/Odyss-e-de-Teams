import React from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { connect } from "react-redux";

// layout
import Main from "layouts/Main";

// components
import Header from "components/Header/Header";

// containers
import Menu from "containers/Menu/Menu";
import Cockpit from "containers/Cockpit/Cockpit";
import Profil from "containers/Profil/Profil";
import Classement from "containers/Classement/Classement";
import Regle from "containers/Regle/Regle";

//store
import IStore from "store/IStore";

interface IPlayerProps extends RouteComponentProps {
  hasGradient: boolean;
}

class Player extends React.Component<IPlayerProps, {}> {
  render() {
    const { hasGradient } = this.props;
    return (
      <Main hasGradient={hasGradient}>
        <Menu currentRouterLink={this.props.location.pathname} />
        <div className={"main-content w-100 py-4 px-3 px-md-5"}>
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
              <Regle />
            </Route>
            <Route exact path="/Planning">
              <p>Planning container</p>
            </Route>
            <Route exact path="/Outillage">
              <p>Outillage container</p>
            </Route>
          </Switch>
        </div>
      </Main>
    );
  }
}

const PlayerRouter = withRouter(Player);

const mapStateToProps = (state: IStore) => {
  return {};
};
export default connect(mapStateToProps)(PlayerRouter);
