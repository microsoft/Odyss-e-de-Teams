import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Button } from "react-bootstrap";
import Cookies from "js-cookie";

import "./App.scss";

import Header from "components/Header/Header";

// containers
import Menu from "containers/Menu/Menu";
import Cockpit from "containers/Cockpit/Cockpit";
import Landing from "containers/Landing/index";
import Profil from "containers/Profil/Profil";
import Classement from "containers/Classement/Classement";
import Regle from "containers/Regle/Regle";
import Jouer from "../Jouer/Jouer";
import Quizz from "../Jouer/Quizz/Quizz";

//layouts
import MainLayout from "layouts/Main";

import Admin from "containers/Admin";

import UserAPI from "api/User";
import AuthService from "api/sso/auth.service";

import IStore from "store/IStore";
import { IAppProps, IAppState } from "models/App";

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      logged: false,
      loading: true,
      is_admin: false,
      //  inTeams: !!params.get("inTeams") || !!params.get("inTeamsSSO"),
    };
  }

  componentDidMount() {
    AuthService.getToken()
      .then((token) => {
        return AuthService.getUser().then((user) => {
          this.setState(
            {
              userAD: user,
              loading: false,
              error: null,
            },
            () => {
              if (user) {
                this._loadCurrentUser();
              }
            }
          );
        });
      })
      .catch((error) => {
        this.setState({
          userAD: null,
          loading: false,
          error: error,
        });
      });
  }

  login = () => {
    this.setState({ loading: true });
    AuthService.login()
      .then((user) => {
        if (user) {
          this.setState({ userAD: user, loading: false }, () => {
            this._loadCurrentUser();
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  onCompleteLanding = (e: any) => {
    UserAPI.createUserByAD("fr", {
      ad: this.state.userAD,
      id_avatar: e.avatarSelected,
    }).then((result: any) => {
      this._loadCurrentUser();
    });
  };

  private _loadCurrentUser = () => {
    if (this.state.userAD) {
      Cookies.set("oid_ad", this.state.userAD.idToken.oid, {
        expires: 7,
        path: "/",
      });
      UserAPI.getUser("fr", "current").then((data) => {
        if (data) {
          this.setState(
            {
              logged: true,
            },
            () => {
              const action_liste = { type: "SET_CURRENT_USER", value: data };
              this.props.dispatch(action_liste);
            }
          );
        }
      });
    }
  };

  render() {
    if (!AuthService.isCallback()) {
      let hasGradient =
        this.props.location.pathname.indexOf("/Jouer") !== -1 ? false : true;
      const isMobile = window.innerWidth <= 768;

      return this.state.userAD ? (
        !this.state.logged ? (
          <Landing
            onCompleteLanding={this.onCompleteLanding}
            isMobile={isMobile}
          />
        ) : (
          <Container
            fluid
            className={`${
              hasGradient ? "gradient" : ""
            } main-container d-flex p-0`}
          >
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
                  <Jouer />
                </Route>
                <Route exact path="/Jouer/Quizz">
                  <Quizz />
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
                <Route exact path="/Landing">
                  <Landing
                    onCompleteLanding={this.onCompleteLanding}
                    isMobile={isMobile}
                  />
                </Route>
              </Switch>
            </div>
          </Container>
        )
      ) : (
        <Container fluid className={`main-container d-flex p-0`}>
          <div className="App-login">
            <div className="App-login-image-container">
              {/* <img
                                                className="App-login-image"
                                                alt="Taskmeow logo"
                                                src={logo}
                                            /> */}
            </div>
            <div className="App-login-button-container">
              <Button variant="primary" onClick={() => this.login()}>
                {/* <img
                                                    className="App-login-button-image"
                                                    alt="Microsoft logo"
                                                    src={microsoftLogo}
                                                /> */}
                <span className="ms-Button-label label-46">Connexion AD</span>
              </Button>
            </div>
          </div>
        </Container>
      );
    } else {
      return (
        <div>
          {this.state?.error ? (
            <div className="App-error">{JSON.stringify(this.state.error)}</div>
          ) : (
            <p>Erreur non spécifiée</p>
          )}
        </div>
      );
    }
  }
}

const AppRouter = withRouter(App);
const mapStateToProps = (state: IStore) => {
  return {};
};
export default connect(mapStateToProps)(AppRouter);
