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
import LevelUpModal from "components/organisms/LevelUpModal/LevelUpModal";
import NewMedalModal from "components/organisms/NewMedalModal/NewMedalModal";
import WeekendModal from "components/organisms/WeekendModal/WeekendModal";

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
import { IMedaille } from "models/Medaille";

interface IPlayerProps extends RouteComponentProps {
  hasGradient: boolean;
  dataLevelUp: ILevelUp;
  listNewMedal: IMedaille[];
  dispatch: any;
}

interface IPlayerState {
  showModalLevelUp?: boolean;
  showModalNewMedal?: boolean;
  isWeekend: boolean;
}

class Player extends React.Component<IPlayerProps, IPlayerState> {
  subscriptionModal: any;

  constructor(props: IPlayerProps) {
    super(props);
    const currentDay = new Date().getDay();
    this.state = {
      showModalLevelUp: false,
      showModalNewMedal: false,
      isWeekend: currentDay === 0 || currentDay === 6 ? true : false,
    };
  }

  componentDidUpdate() {
    this.subscriptionModal = this._hasModal();
  }

  componentWillUnmount() {
    delete this.subscriptionModal;
  }

  private _hasModal = () => {
    if (!this.state.isWeekend) {
      if (
        !this.state.showModalLevelUp &&
        !this.state.showModalNewMedal &&
        ((this.props.dataLevelUp && this.props.dataLevelUp.hasLevelUp) ||
          this.props.listNewMedal)
      ) {
        if (this.props.listNewMedal) {
          this._setShowModalNewMedal(true);
        } else {
          this._setShowModalLevelUp(true);
        }
      }
    }
  };

  private _setShowModalLevelUp = (show: boolean) => {
    this.setState({
      showModalLevelUp: show,
    });
  };

  private _setShowModalNewMedal = (show: boolean) => {
    this.setState({
      showModalNewMedal: show,
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

  private _setNewMedalChecked = () => {
    const action_liste = {
      type: "NEW_MEDAL",
      value: null,
    };
    this.props.dispatch(action_liste);
    this._setShowModalNewMedal(false);
  };

  render() {
    const isMobile = window.innerWidth < 768;

    const { hasGradient, dataLevelUp, listNewMedal } = this.props;

    if (!isMobile)
      return (
        <Main hasGradient={hasGradient}>
          {!this.state.isWeekend && (
            <Menu currentRouterLink={this.props.location.pathname} />
          )}
          <div className={"main-content w-100 py-4 px-3 px-md-5"}>
            <div className={"mb-3"}>
              <Header hasGradient={hasGradient} />
            </div>
            {!this.state.isWeekend && (
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
              </Switch>
            )}
          </div>
          <LevelUpModal
            dataLevelUp={dataLevelUp}
            show={this.state.showModalLevelUp}
            setLevelUpChecked={this._setLevelUpChecked}
          />
          <NewMedalModal
            listNewMedal={listNewMedal}
            show={this.state.showModalNewMedal}
            setNewMedalChecked={this._setNewMedalChecked}
          />
          <WeekendModal isWeekend={this.state.isWeekend} />
        </Main>
      );
    else
      return (
        <MobileLayout currentRouterLink={this.props.location.pathname}>
          {!this.state.isWeekend && (
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
            </Switch>
          )}
          <LevelUpModal
            dataLevelUp={dataLevelUp}
            show={this.state.showModalLevelUp}
            setLevelUpChecked={this._setLevelUpChecked}
          />
          <NewMedalModal
            listNewMedal={listNewMedal}
            show={this.state.showModalNewMedal}
            setNewMedalChecked={this._setNewMedalChecked}
          />
          <WeekendModal isWeekend={this.state.isWeekend} />
        </MobileLayout>
      );
  }
}

const PlayerRouter = withRouter(Player);

const mapStateToProps = (state: IStore) => {
  return {
    dataLevelUp: state.user.dataLevelUp,
    listNewMedal: state.user.listNewMedal,
  };
};
export default connect(mapStateToProps)(PlayerRouter);
