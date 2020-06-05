import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { forkJoin } from "rxjs";

import QuestionAPI from "api/Question";

import QCM from "components/MecaniqueQuestion/QCM/QCM";
import QCMVideo from "components/MecaniqueQuestion/QCM/QCMVideo";
import RemettreOrdre from "components/MecaniqueQuestion/RemettreOrdre/RemettreOrdre";
import StopWatch from "components/StopWatch/StopWatch";

import { IRecapQuizzState, IQuestion } from "src/models/Question";

import "./RecapQuizz.scss";

class RecapQuizz extends Component<RouteComponentProps, IRecapQuizzState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      isLoading: true,
      tempsTotal: 0,
    };
  }

  componentDidMount() {
    this._loadRecapQuizz();
  }

  private _loadRecapQuizz = () => {
    const {
      match: { params },
    }: any = this.props;

    forkJoin([
      QuestionAPI.getModule("fr", params.moduleId),
      QuestionAPI.getNiveau("fr", params.niveauId),
      QuestionAPI.getRecapQuizz("fr", {
        id_module: params.moduleId,
        id_niveau: params.niveauId,
      }),
    ])
      .toPromise()
      .then((data) => {
        const reducer = (accumulator: number, currentValue: number) =>
          accumulator + currentValue;
        let listQuestion: IQuestion[] = data[2].results ? data[2].results : [];
        let tempsTotal: number = 0;
        if (listQuestion && listQuestion.length > 0) {
          tempsTotal = listQuestion.map((q) => q.temps_reponse).reduce(reducer);
        }
        this.setState({
          currentModule: data[0].results,
          currentNiveau: data[1].results,
          listQuestion: listQuestion,
          isLoading: false,
          tempsTotal: tempsTotal,
        });
      });
  };
  private _renderMecanique(item: IQuestion) {
    switch (item.id_mecanique) {
      case 1: // QCM - Choix unique
        return (
          <div>
            <QCM question={item} isRecap={true} />
          </div>
        );
      case 2: // QCM - Choix multiple
        return (
          <div>
            <QCM question={item} multiple={true} isRecap={true} />
          </div>
        );
      case 3: // QCM avec vidéo - Choix unique
        return (
          <div>
            <QCMVideo question={item} isRecap={true} />
          </div>
        );
      case 4: // QCM avec vidéo - Choix multiple
        return (
          <div>
            <QCMVideo question={item} multiple={true} isRecap={true} />
          </div>
        );
      case 5: // Remettre dans l'ordre
        return (
          <div>
            <RemettreOrdre question={item} isRecap={true} />
          </div>
        );
      case 6: // QCM avec pictos réponses - Choix unique
        return (
          <div>
            <QCM question={item} isRecap={true} />
          </div>
        );
      case 7: // QCM avec pictos réponses - Choix multiple
        return (
          <div>
            <QCM question={item} multiple={true} isRecap={true} />
          </div>
        );
    }
  }

  render() {
    let secondeTotal = (
      "0" +
      (Math.floor(this.state.tempsTotal / 1000) % 60)
    ).slice(-2);
    let minuteTotal = (
      "0" +
      (Math.floor(this.state.tempsTotal / 60000) % 60)
    ).slice(-2);
    return (
      <div className={"d-flex flex-column flex-md-row"}>
        <div className={"main-recap-quizz w-100"}>
          <h1 className={"color-white d-flex d-md-none justify-content-center"}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/question/module/" +
                this.state.currentModule?.image
              }
              alt={`Illustration module ${this.state.currentModule?.nom}`}
              className={"ico-titre"}
            />
            {this.state.currentModule?.nom} - {this.state.currentNiveau?.nom}
          </h1>
          <div className={"main-encart nobg-mobile main-entete"}>
            <div className={"d-flex flex-column flex-md-row"}>
              <div>
                <div
                  className={"d-none d-md-flex mb-2 titre align-items-center"}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/question/module/" +
                      this.state.currentModule?.image
                    }
                    alt={`Illustration module ${this.state.currentModule?.nom}`}
                  />
                  <div className={"ml-2"}>
                    <h2 className={"color-primary-light mb-1"}>
                      {this.state.currentModule?.nom}{" "}
                      <strong className={"color-primary"}>
                        - {this.state.currentNiveau?.nom}
                      </strong>
                    </h2>
                    <p className={"mb-0 d-none d-md-block"}>
                      Résultat de ton exploration
                    </p>
                  </div>
                </div>
                <h4 className={"mb-0 d-block d-md-none color-white1"}>
                  Résultat de ton exploration
                </h4>
                <div className={"mt-4"}>
                  <h5
                    className={
                      "d-block d-md-flex flex-md-row align-items-center"
                    }
                  >
                    <span className={"d-block d-md-inline-block"}>
                      Score obtenu :{" "}
                    </span>
                    <span
                      className={
                        "color-primary-light h4 mb-0 ml-md-2 d-block d-md-inline-block"
                      }
                    >
                      {this.state.listQuestion
                        ? this.state.listQuestion.filter((q) => q.valid).length
                        : 0}
                      /{this.state.listQuestion?.length} bonnes réponses !
                    </span>
                  </h5>
                  <h5
                    className={
                      "mt-3 d-block d-md-flex flex-md-row align-items-center"
                    }
                  >
                    <span className={"d-block d-md-inline-block"}>
                      Temps de l'exploration :{" "}
                    </span>
                    <span
                      className={
                        "color-primary-light h4 mb-0 ml-md-2 d-block d-md-inline-block"
                      }
                    >
                      {minuteTotal}min et {secondeTotal}sec
                    </span>
                  </h5>
                </div>
              </div>
              <div
                className={
                  "sep d-none d-md-flex flex-column mx-4 justify-content-center"
                }
              >
                <p></p>
              </div>
              <div className={"pl-md-1"}>
                <h5 className={"d-none d-md-block"}>Tes récompenses :</h5>
                <div className={"color-primary-light"}>
                  <h5 className={"d-block d-md-none color-white1 mt-2"}>
                    Points d’expérience remportés
                  </h5>
                  <h2 className={"total-xp mb-0"}>+ xx EXP</h2>
                  <p className={"mb-4 d-none d-md-block"}>
                    <small>Points d’expérience remportés</small>
                  </p>
                  <h5 className={"d-block d-md-none color-white1 mt-2"}>
                    Points de classement remportés
                  </h5>
                  <h2 className={"total-point mb-0"}>+ xx Points</h2>
                  <p className={"mb-0 d-none d-md-block"}>
                    <small>Points de classement remportés</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={"main-encart nobg-mobile"}>
            <h2 className={"color-primary-light mb-1 d-none d-md-block"}>
              Récapitulatif des réponses
            </h2>
            <p>
              Tu trouveras ci-dessous toutes les réponses aux questions que tu
              as rencontré pendant ton exploration. Lis-les attentivement car il
              se peut que des secrets et astuces sur Teams y soient cachés.
            </p>
            {this.state.listQuestion?.map((item: IQuestion, i: number) => {
              return (
                <div
                  key={item.id_question}
                  className={`recap question${
                    item.valid ? " valid" : " invalid"
                  }`}
                >
                  <div className={"mt-4 intitule"}>
                    <h5>{item.nom}</h5>
                    <p className={"mb-0"}>
                      Question {i + 1}/{this.state.listQuestion?.length}
                    </p>
                  </div>
                  {item.valid ? (
                    <p className={"p-result pl-md-3 mt-3"}>
                      Tu as sélectionné la bonne réponse, bravo !
                    </p>
                  ) : (
                    <p className={"p-result pl-md-3 mt-3"}>
                      Malheureusement, tu n’as pas sélectionné la bonne réponse
                      ! Regarde la réponse ci-dessous
                    </p>
                  )}
                  <div className={"mt-4"}>{this._renderMecanique(item)}</div>
                  {item.astuce ? (
                    <div className={"pl-md-3 mt-3"}>
                      <h3 className={"color-primary-light"}>Petite astuce Teams !</h3>
                      <p className={"mb-0"}>{item.astuce}</p>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              );
            })}
            <p className={"text-right mt-5"}>
              <Button
                variant="primary"
                className={"d-inline-block mr-3"}
                href={"/#/Jouer"}
              >
                Lancer un autre module !
              </Button>
              <Button
                variant="primary"
                className={"d-inline-block"}
                href={"/#/Cockpit"}
              >
                Retour au cokpit
              </Button>
            </p>
          </div>
        </div>
        <div className={"toolbar-right ml-0 ml-md-5"}>
          {this.state.isLoading ? (
            <span></span>
          ) : (
            <StopWatch done={true} initTimer={this.state.tempsTotal} />
          )}
        </div>
      </div>
    );
  }
}

export default RecapQuizz;
