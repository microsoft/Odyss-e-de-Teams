import React, { Component } from "react";
import { forkJoin } from "rxjs";
import { Button, Table, ButtonGroup } from "react-bootstrap";

import ClassementAPI from "api/Classement";

import { IClassementState, IClassement } from "../../models/Classement";

import "./Classement.scss";

class Classement extends Component<{}, IClassementState> {
  constructor(props: any) {
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
    forkJoin([
      ClassementAPI.getClassement("fr", this.state.currentView, {
        monde: this.state.viewMonde ? 1 : 0,
        limit: 100,
      }),
      ClassementAPI.getClassement("fr", this.state.currentView, {
        monde: this.state.viewMonde ? 1 : 0,
        user: 1,
      }),
    ])
      .toPromise()
      .then((data) => {
        this.setState({
          listUser: data[0] ? data[0] : [],
          classementCurrentUser: data[1],
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
          Classements du programme en cours
        </h1>
        <h1 className={"color-white d-flex d-md-none justify-content-center"}>
          <img
            src={process.env.PUBLIC_URL + "/images/icone/cup.png"}
            alt="Ico Classement Général"
            className={"ico-titre"}
          />
          Classement de la saison
        </h1>
        <div className={"main-encart nobg-mobile main-classement"}>
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
              Classement général
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
              Classement points EXP
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
                Classement
                <br />
                Jeu
              </Button>
              <Button
                variant={this.state.currentView === "xp" ? "primary" : "dark"}
                onClick={() => this._setCurrentView("xp")}
                className={"mr-3"}
              >
                Classement
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
                <th className={"th-nom"}>Explorateur.trice</th>
                <th>Points classement</th>
                <th>Bonnes réponses</th>
                <th>Mauvaises réponses</th>
                <th>Questionnaires complétés</th>
                <th>Niveau</th>
                <th>Médailles</th>
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
            {this.state.listUser
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
                  <td>{this._renderPoint(this.state.classementCurrentUser)}</td>
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

export default Classement;
