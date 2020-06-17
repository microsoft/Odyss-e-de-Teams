import React from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { connect } from "react-redux";

// API
import UserAPI from "api/User";

// layout
import Main from "layouts/Main";
import MobileLayout from "layouts/Mobile";

// components
import Header from "components/Header/Header";

// containers
import Menu from "containers/Menu/Menu";
import Cockpit from "containers/Cockpit/Cockpit";
import Profil from "containers/Profil/Profil";
import Classement from "containers/Classement/Classement";
import Regle from "containers/Regle/Regle";
import Jouer from "containers/Jouer/Jouer";
import Quizz from "containers/Jouer/Quizz/Quizz";
import RecapQuizz from "containers/Jouer/RecapQuizz/RecapQuizz";

//models
import IStore from "store/IStore";
import { ILevelUp } from "models/User";
import LevelUpModal from "components/organisms/LevelUpModal/LevelUpModal";

interface IPlayerProps extends RouteComponentProps {
  hasGradient: boolean;
  dataLevelUp: ILevelUp;
  dispatch: any;
}

interface IPlayerState {
  showModalLevelUp?: boolean;
}

class Player extends React.Component<
  IPlayerProps,
  IPlayerState
> {
  subscriptionLevelUp: any;

  constructor(props: IPlayerProps) {
    super(props);
    this.state = {
      showModalLevelUp: false,
    };
  }

  componentDidUpdate() {
    this.subscriptionLevelUp = this._levelUp();
  }

  componentWillUnmount() {
    delete this.subscriptionLevelUp;
  }

  private _levelUp = () => {
    if (
      this.props.dataLevelUp &&
      this.props.dataLevelUp.hasLevelUp &&
      !this.state.showModalLevelUp
    ) {
      this._setShowModalLevelUp(true);
    }
  };

  private _setShowModalLevelUp = (show: boolean) => {
    this.setState({
      showModalLevelUp: show,
    });
  };

  private _setLevelUpChecked = () => {
    UserAPI.checkLevelUp().then((data: ILevelUp) => {
      const action_liste = {
        type: "LEVEL_UP",
        value: data && data.hasLevelUp ? data : null,
      };
      this.props.dispatch(action_liste);
      this._setShowModalLevelUp(false);
    });
  };

  render() {
    const isMobile = window.innerWidth < 768;

    const { hasGradient, dataLevelUp } = this.props;

    if (!isMobile)
      return (
        <Main hasGradient={hasGradient}>
          <Menu currentRouterLink={this.props.location.pathname} />
          <div className={"main-content w-100 py-4 px-3 px-md-5"}>
            <div className={"mb-3"}>
              <Header hasGradient={hasGradient} />
            </div>
            <Switch>
              <Route exact path="/Cockpit">
                <Cockpit isMobile={isMobile} />
              </Route>
              <Route exact path="/Jouer">
                <Jouer />
              </Route>
              <Route exact path="/Jouer/Quizz">
                <Quizz />
              </Route>
              <Route
                exact
                path="/Jouer/RecapQuizz/:moduleId/:niveauId"
                component={RecapQuizz}
              />
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
          <LevelUpModal dataLevelUp={dataLevelUp} show={this.state.showModalLevelUp} setLevelUpChecked={this._setLevelUpChecked} />
        </Main>
      );
    else
      return (
        <MobileLayout currentRouterLink={this.props.location.pathname}>
          <Switch>
            <Route exact path="/Cockpit">
              <Cockpit isMobile={isMobile} />
            </Route>
            <Route exact path="/Jouer">
              <Jouer />
            </Route>
            <Route exact path="/Jouer/Quizz">
              <Quizz />
            </Route>
            <Route
              exact
              path="/Jouer/RecapQuizz/:moduleId/:niveauId"
              component={RecapQuizz}
            />
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
          <LevelUpModal dataLevelUp={dataLevelUp} show={this.state.showModalLevelUp} setLevelUpChecked={this._setLevelUpChecked} />
        </MobileLayout>
      );
  }
}

const PlayerRouter = withRouter(Player);

const mapStateToProps = (state: IStore) => {
  return {
    dataLevelUp: state.user.dataLevelUp,
  };
};
export default connect(mapStateToProps)(PlayerRouter);
