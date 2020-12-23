import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { forkJoin } from "rxjs";
import Cookies from "js-cookie";

import { withTranslation, WithTranslation } from "react-i18next";
import i18n from '../../config/i18n';

import "./App.scss";

// containers
import Landing from "containers/Landing/index";

import AdminContainer from "containers/Admin";
import PlayerContainer from "containers/Player";
import LoginContainer from "containers/Login";
import LoadingContainer from "containers/Loading";

import UserAPI from "api/User";
import OrganisationAPI from "api/Organisation";
import AuthService from "api/sso/auth.service";

import IStore from "store/IStore";
import { IAppProps, IAppState } from "models/App";

class App extends React.Component<IAppProps & WithTranslation, IAppState> {
  constructor(props: IAppProps & WithTranslation) {
    super(props);
    this.state = {
      logged: false,
      loading: true,
      is_admin: false,
    };
  }

  componentDidMount() {
    AuthService.getToken()
      .then(() => {
        return AuthService.getUser().then((user) => {
          this.setState(
            {
              userAD: user || false,
              error: null,
            },
            () => {
              if (user) {
                this._loadCurrentUser();
              } else {
                this.setState({
                  loading: false,
                });
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
    UserAPI.createUserByAD(i18n.language, {
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

      UserAPI.getUser(i18n.language, "current").then((user) => {
        if (user) {
          forkJoin([
            OrganisationAPI.getOrganisationInfos(user.id_organisation),
            UserAPI.getCurrentCampaignInfo(),
          ])
            .toPromise()
            .then((data) => {
              const action_current_user = {
                type: "SET_CURRENT_USER",
                value: user,
              };
              this.props.dispatch(action_current_user);
              const action_current_organisation = {
                type: "SET_CURRENT_ORGANISATION",
                value: data[0],
              };
              this.props.dispatch(action_current_organisation);
              const action_current_campaign = {
                type: "SET_CURRENT_CAMPAIGN",
                value: data[1] ? data[1].results : null,
              };
              this.props.dispatch(action_current_campaign);
              this.setState({
                logged: true,
                is_admin: user.id_role === 2,
                loading: false,
              });
            });
        } else {
          this.setState({
            logged: false,
            loading: false,
          });
        }
      });
    }
  };

  render() {
    const {
      t,
      tReady
    } = this.props;
    if (this.state.logged && this.props.location.pathname === "/") {
      return <Redirect to="/Cockpit" />;
    }

    const isMobile = window.innerWidth <= 768;
    const { loading } = this.state;

    if (loading) {
      return <LoadingContainer />;
    } else {
      if (AuthService.isCallback()) {
        return (
          <div>
            {this.state?.error ? (
              <div className="App-error">
                {JSON.stringify(this.state.error)}
              </div>
            ) : (
                <p>{tReady && t("modal.utils.error_unknown")}</p>
              )}
          </div>
        );
      } else {
        if (!this.state.userAD) {
          return <LoginContainer onLogin={() => this.login()} />;
        } else {
          if (!this.state.logged)
            return (
              <Landing
                onCompleteLanding={this.onCompleteLanding}
                isMobile={isMobile}
              />
            );

          if (this.state.is_admin) return <AdminContainer />;

          if (!this.state.is_admin) {
            let hasGradient =
              this.props.location.pathname.indexOf("/Jouer") !== -1
                ? false
                : true;
            return <PlayerContainer hasGradient={hasGradient} />;
          }
        }
      }
    }
  }
}

const AppRouter = withRouter(App);
const mapStateToProps = (state: IStore) => {
  return {};
};
export default withTranslation()(connect(mapStateToProps)(AppRouter));
