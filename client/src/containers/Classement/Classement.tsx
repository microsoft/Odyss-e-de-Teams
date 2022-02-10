import React, { Component } from "react";
import { Button, Table, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { forkJoin } from "rxjs";

import { WithTranslation, withTranslation } from "react-i18next";
import i18n from '../../config/i18n';

import ClassementAPI from "api/Classement";

import {
  IClassementProps,
  IClassementState,
  IClassement,
} from "../../models/Classement";

import "./Classement.scss";
import IStore from "store/IStore";

class Classement extends Component<IClassementProps & WithTranslation, IClassementState> {
  constructor(props: IClassementProps & WithTranslation) {
    super(props);
    this.state = {
      listUser: [],
      currentView: "point",
      viewMonde: false,
    };
  }

  componentDidMount() {
    this._loadDataClassement();
  }

  private _loadDataClassement = () => {
    let tabBatch = [
      ClassementAPI.getClassement(i18n.language, this.state.currentView, {
        monde: this.state.viewMonde ? 1 : 0,
      }),
    ];
    let isAdmin: boolean = false;
    switch (this.props.currentUser.id_role) {
      case 2: //admin
        isAdmin = true;
        tabBatch.push(
          ClassementAPI.getIndicateur()
        );
        break;
      default:
        tabBatch.push(
          ClassementAPI.getClassement(i18n.language, this.state.currentView, {
            monde: this.state.viewMonde ? 1 : 0,
            user: 1,
          })
        );
        break;
    }
    forkJoin(tabBatch)
      .toPromise()
      .then((data) => {
        this.setState({
          listUser: data[0] ? data[0] : [],
          classementCurrentUser: !isAdmin ? data[1] : null,
          listIndicateur: isAdmin ? data[1] : null,
        });
      });
  };

  private _setCurrentView = (view: string) => {
    this.setState(
      {
        currentView: view,
      },
      () => {
        this._loadDataClassement();
      }
    );
  };

  /* private _setViewMonde = () => {
        this.setState(
            {
                viewMonde: !this.state.viewMonde,
            },
            () => {
                this._loadDataClassement();
            }
        );
    }; */

  private _calculMauvaiseReponse = (item: IClassement) => {
    if (item && item.nb_reponse && item.nb_reponse > 0) {
      return item.nb_reponse - (item.nb_reponse_ok ? item.nb_reponse_ok : 0);
    }
    return 0;
  };

  private _renderPoint(item: IClassement) {
    switch (this.state.currentView) {
      case "xp":
        return item?.nb_xp;
      default:
        return item?.nb_point;
    }
  }

  private _renderPodiumElement(user) {
    return (
      <div className={`podium-user top${user.rang} text-center`}>
        <p className={"avatar mb-0 pb-0"}>
          <img src={process.env.PUBLIC_URL + user.image_avatar} alt="Avatar" />
        </p>
        <p className={"pb-0 mb-0"}>
          {user.rang}.<strong>{user.nom}</strong>
        </p>
        <p className={"pb-0 mb-0"}>{this._renderPoint(user)} points</p>
      </div>
    );
  }

  render() {
    const {
      t,
      tReady
    } = this.props;
    const userTop1 =
      this.state.listUser?.filter((u) => u.rang === 1).length > 0
        ? this.state.listUser?.filter((u) => u.rang === 1)[0]
        : null;
    const userTop2 =
      this.state.listUser?.filter((u) => u.rang === 2).length > 0
        ? this.state.listUser?.filter((u) => u.rang === 2)[0]
        : null;
    const userTop3 =
      this.state.listUser?.filter((u) => u.rang === 3).length > 0
        ? this.state.listUser?.filter((u) => u.rang === 3)[0]
        : null;
    return (
      <div>
        <h1 className={"color-primary d-none d-md-block"}>
        {tReady && t("ranking.program_ranking")}
        </h1>
        <h1 className={"color-white d-flex d-md-none justify-content-center"}>
          <img
            src={process.env.PUBLIC_URL + "/images/icone/cup.png"}
            alt="Ico Classement Général"
            className={"ico-titre"}
          />
          {tReady && t("ranking.season_ranking")}
        </h1>
        <div className={"main-encart nobg-mobile main-classement"}>
          {
            this.props.currentUser?.id_role === 2 && (
              <div className={"indicateur"}>
                <div className={"d-flex flex-column flex-md-row"}>
                  <div className={"d-flex flex-column align-items-center justify-content-center indicateur-item p-2 pt-3 mr-2"}>
                    <p className={"h1 mb-2"}>{this.state.listIndicateur?.nbJoueur}</p>
                    <p className={"mb-0 text-center"}>{tReady && t("ranking.player_in")}</p>
                  </div>
                  <div className={"d-flex flex-column align-items-center justify-content-center indicateur-item p-2 pt-3 mx-2"}>
                    <p className={"h1 mb-2"}>{this.state.listIndicateur?.nbJoueurSemaine}</p>
                    <p className={"mb-0 text-center"}>{tReady && t("ranking.new_players")}</p>
                  </div>
                  <div className={"d-flex flex-column align-items-center justify-content-center indicateur-item p-2 pt-3 mx-2"}>
                    <p className={"h1 mb-2"}>{this.state.listIndicateur?.pcReponseOk}<sup>%</sup></p>
                    <p className={"mb-0 text-center"}>{tReady && t("ranking.total_good_answers")}</p>
                  </div>
                  <div className={"d-flex flex-column align-items-center justify-content-center indicateur-item p-2 pt-3 mx-2"}>
                    <p className={"h1 mb-2"}>{this.state.listIndicateur?.nbJoueurNiv15}</p>
                    <p className={"mb-0 text-center"}>{tReady && t("ranking.playes_lvl_15")}</p>
                  </div>
                  <div className={"d-flex flex-column align-items-center justify-content-center indicateur-item p-2 pt-3 ml-2"}>
                    <p className={"h1 mb-2"}>{this.state.listIndicateur?.nbModuleCompletSemaine}</p>
                    <p className={"mb-0 text-center"}>{tReady && t("ranking.modules_completed")}</p>
                  </div>
                </div>
                <p className="p-sep w-100"></p>
              </div>
            )
          }
          <div className={"d-none d-md-block mb-3"}>
            {" "}
            {/* btn vu dekstop */}
            <Button
              variant={this.state.currentView === "point" ? "primary" : "dark"}
              onClick={() => this._setCurrentView("point")}
              className={"mr-3 bleu"}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/icone/cup.png"}
                alt="Ico Classement Général"
                className={"btn-ico"}
              />
              {tReady && t("ranking.global_ranking")}
            </Button>
            <Button
              variant={this.state.currentView === "xp" ? "primary" : "dark"}
              onClick={() => this._setCurrentView("xp")}
              className={"mr-3 bleu d-inline-flex align-items-center"}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/icone/coin.png"}
                alt="Ico Classement EXP"
                className={"btn-ico"}
              />
              {tReady && t("ranking.exp_ranking")}
            </Button>
            {/* suppression classement monde / demande MS <Button
                            variant={this.state.viewMonde ? "primary" : "dark"}
                            onClick={() => this._setViewMonde()}
                            className={"mr-3 d-inline-flex align-items-center"}
                        >
                            <img
                                src={process.env.PUBLIC_URL + "/images/icone/monde.png"}
                                alt="Ico Classement monde"
                                className={"btn-ico"}
                            />
                            Classement monde
                        </Button> */}
          </div>
          <div className={"d-md-none mb-4 text-center"}>
            {" "}
            {/* btn vu mobile */}
            <ButtonGroup aria-label="Filtre du classement" className={"mr-2"}>
              <Button
                variant={
                  this.state.currentView === "point" ? "primary" : "dark"
                }
                onClick={() => this._setCurrentView("point")}
              >
                {tReady && t("ranking.ranking")}
                <br />
                {tReady && t("ranking.game")}
              </Button>
              <Button
                variant={this.state.currentView === "xp" ? "primary" : "dark"}
                onClick={() => this._setCurrentView("xp")}
                className={"mr-3"}
              >
                {tReady && t("ranking.ranking")}
                <br />
                EXP
              </Button>
            </ButtonGroup>
            {/* suppression classement monde / demande MS  <Button
                            variant={this.state.viewMonde ? "primary" : "dark"}
                            onClick={() => this._setViewMonde()}
                        >
                            <img
                                src={process.env.PUBLIC_URL + "/images/icone/monde.png"}
                                alt="Ico Classement monde"
                                className={"btn-ico d-block mx-auto"}
                            />
                            monde
                        </Button> */}
            {/* podium mobile */}
            <div className={"position-relative d-flex podium"}>
              {userTop2 ? (
                this._renderPodiumElement(userTop2)
              ) : (
                <div className={"podium-user top2"}></div>
              )}
              {userTop1 ? (
                this._renderPodiumElement(userTop1)
              ) : (
                <div className={"podium-user top1"}></div>
              )}
              {userTop3 ? (
                this._renderPodiumElement(userTop3)
              ) : (
                <div className={"podium-user top3"}></div>
              )}
            </div>
          </div>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th className={"th-nom"}>{tReady && t("utils.explorer")}</th>
                <th>{tReady && t("ranking.ranking_points")}</th>
                <th>{tReady && t("utils.good_answers")}</th>
                <th>{tReady && t("ranking.bad_answers")}</th>
                <th>{tReady && t("utils.questioner_complete")}</th>
                <th>{tReady && t("utils.level")}</th>
                <th>{tReady && t("ranking.medals")}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listUser?.map((item: IClassement) => {
                return (
                  <tr
                    key={item.id_user}
                    className={`rang${item.rang}${
                      item.id_user === this.state.classementCurrentUser?.id_user
                        ? " active"
                        : ""
                    }`}
                  >
                    <td>{item.rang}</td>
                    <td>
                      <div className={"d-flex"}>
                        {item.image_avatar ? (
                          <p className={"avatar mb-0 pb-0"}>
                            <img
                              src={process.env.PUBLIC_URL + item.image_avatar}
                              alt="Avatar"
                            />
                          </p>
                        ) : (
                          <span className={"d-none"}></span>
                        )}
                        <p className={"mb-0 pb-0"}>{item.nom}</p>
                      </div>
                    </td>
                    <td>
                      {this._renderPoint(item)}
                      <span className={"d-md-none"}> points</span>
                    </td>
                    <td className={"no-mobile"}>
                      {item.nb_reponse_ok ? item.nb_reponse_ok : 0}
                    </td>
                    <td className={"no-mobile"}>
                      {this._calculMauvaiseReponse(item)}
                    </td>
                    <td className={"no-mobile"}>
                      {item.nb_questionnaire_complete}
                    </td>
                    <td className={"no-mobile"}>{item.niveau}</td>
                    <td className={"no-mobile"}>{item.nb_medaille}</td>
                  </tr>
                );
              })}
            </tbody>
            {this.state.classementCurrentUser &&
              this.state.listUser
                ?.map((u) => u.id_user)
                .indexOf(this.state.classementCurrentUser?.id_user) === -1 && (
                <tfoot>
                  <tr>
                    <td>{this.state.classementCurrentUser?.rang}</td>
                    <td>
                      <div className={"d-flex"}>
                        {this.state.classementCurrentUser?.image_avatar ? (
                          <p className={"avatar mb-0 pb-0"}>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                this.state.classementCurrentUser?.image_avatar
                              }
                              alt="Avatar"
                            />
                          </p>
                        ) : (
                          <span className={"d-none"}></span>
                        )}
                        <p className={"mb-0 pb-0"}>
                          {this.state.classementCurrentUser?.nom}
                        </p>
                      </div>
                    </td>
                    <td>
                      {this._renderPoint(this.state.classementCurrentUser)}
                    </td>
                    <td className={"no-mobile"}>
                      {this.state.classementCurrentUser?.nb_reponse_ok
                        ? this.state.classementCurrentUser?.nb_reponse_ok
                        : 0}
                    </td>
                    <td className={"no-mobile"}>
                      {this._calculMauvaiseReponse(
                        this.state.classementCurrentUser
                      )}
                    </td>
                    <td className={"no-mobile"}>
                      {
                        this.state.classementCurrentUser
                          ?.nb_questionnaire_complete
                      }
                    </td>
                    <td className={"no-mobile"}>
                      {this.state.classementCurrentUser?.niveau}
                    </td>
                    <td className={"no-mobile"}>
                      {this.state.classementCurrentUser?.nb_medaille}
                    </td>
                  </tr>
                </tfoot>
              )}
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default withTranslation()(connect(mapStateToProps)(Classement));
