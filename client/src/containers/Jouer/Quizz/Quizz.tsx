import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import QuestionAPI from "api/Question";

import QCM from "components/MecaniqueQuestion/QCM/QCM";
import RemettreOrdre from "components/MecaniqueQuestion/RemettreOrdre/RemettreOrdre";
import QCMVideo from "components/MecaniqueQuestion/QCM/QCMVideo";
import Stopwatch from "components/StopWatch/StopWatch";

import IStore from "src/store/IStore";
import {
  IQuizzProps,
  IQuizzState,
  IQuestion,
  IReponse,
} from "src/models/Question";

import "./Quizz.scss";

class Quizz extends Component<IQuizzProps, IQuizzState> {
  constructor(props: IQuizzProps) {
    super(props);
    this.state = {
      isLoading: true,
      step: 1,
      hasReponse: false,
      listQuestion:
        props.dataInitQuizz.listQuestion &&
        props.dataInitQuizz.listQuestion.length > 0
          ? props.dataInitQuizz.listQuestion
          : [],
    };
  }

  componentDidMount() {
    // todo if (!(this.state.listQuestion.length > 0)) {
    this._loadQuizz();
    // }
  }

  private _loadQuizz = () => {
    QuestionAPI.getQuizz("fr", {
      id_module: this.props.dataInitQuizz.selectedModule.id_module,
      id_niveau: this.props.dataInitQuizz.selectedNiveau.id_niveau,
    }).then((data: any) => {
      this.setState(
        {
          listQuestion: data.results,
          isLoading: false,
        },
        () => {
          const action_liste = {
            type: "SET_LIST_QUESTION",
            value: this.state.listQuestion,
          };
          this.props.dispatch(action_liste);
        }
      );
    });
  };

  private _onSelect = (question: IQuestion, reponseIds: number[]) => {
    question.selectedReponseIds = reponseIds;
    this.setState({
      hasReponse: question.selectedReponseIds.length > 0,
    });
  };

  private _saveReponse() {
    let curStep: number = this.state.step;
    this.setState(
      {
        step: ++curStep,
        hasReponse: false,
      },
      () => {
        // reinit list question
      }
    );
  }

  private _renderMecanique(item: IQuestion) {
    switch (item.id_mecanique) {
      case 1: // QCM - Choix unique
        return (
          <div>
            <p>Choisissez une réponse.</p>
            <QCM question={item} onSelect={this._onSelect} />
          </div>
        );
      case 2: // QCM - Choix multiple
        return (
          <div>
            <p>Cocher les bonnes réponses</p>
            <QCM question={item} onSelect={this._onSelect} multiple={true} />
          </div>
        );
      case 3: // QCM avec vidéo - Choix unique
        return (
          <div>
            <p>Regardez la vidéo et sélectionnez la bonne réponse.</p>
            <QCMVideo question={item} onSelect={this._onSelect} />
          </div>
        );
      case 4: // QCM avec vidéo - Choix multiple
        return (
          <div>
            <p>Regardez la vidéo et sélectionnez les bonnes réponses.</p>
            <QCMVideo
              question={item}
              onSelect={this._onSelect}
              multiple={true}
            />
          </div>
        );
      case 5: // Remettre dans l'ordre
        return (
          <div>
            <p>Cliquez sur les listes pour mettre les étapes dans l’ordre !</p>
            <RemettreOrdre question={item} onSelect={this._onSelect} />
          </div>
        );
      case 6: // QCM avec pictos réponses - Choix unique
        return (
          <div>
            <p>Trouvez l’intrus !</p>
            <QCM question={item} onSelect={this._onSelect} /> {/* todo */}
          </div>
        );
      case 7: // QCM avec pictos réponses - Choix multiple
        return (
          <div>
            <p>Cliquez sur les vignettes.</p>
            <QCM
              question={item}
              onSelect={this._onSelect}
              multiple={true}
            />{" "}
            {/* todo */}
          </div>
        );
    }
  }

  render() {
    return (
      <div className={"d-flex flex-column flex-md-row"}>
        <div className={"main-quizz w-100"}>
          <h1 className={"color-white d-flex d-md-none justify-content-center"}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/question/module/" +
                this.props.dataInitQuizz.selectedModule?.image
              }
              alt={`Illustration module ${this.props.dataInitQuizz.selectedModule?.nom}`}
              className={"ico-titre"}
            />
            {this.props.dataInitQuizz.selectedModule?.nom} -{" "}
            {this.props.dataInitQuizz.selectedNiveau?.nom}
          </h1>
          <div className={"main-encart"}>
            <div className={"d-none d-md-flex mb-2 titre"}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/question/module/" +
                  this.props.dataInitQuizz.selectedModule?.image
                }
                alt={`Illustration module ${this.props.dataInitQuizz.selectedModule?.nom}`}
              />
              <div className={"ml-2"}>
                <h2 className={"color-primary-light mb-1"}>
                  {this.props.dataInitQuizz.selectedModule?.nom} -{" "}
                  <strong className={"color-primary"}>
                    {this.props.dataInitQuizz.selectedNiveau?.nom}
                  </strong>
                </h2>
                <p className={"mb-0"}>
                  Question{" "}
                  {this.state.step <= this.state.listQuestion?.length
                    ? this.state.step
                    : this.state.listQuestion?.length}{" "}
                  / {this.state.listQuestion?.length}
                </p>
              </div>
            </div>
            {this.state.step <= this.state.listQuestion?.length ? (
              this.state.listQuestion?.map((item: IQuestion, i: number) => {
                return (
                  <div
                    key={item.id_question}
                    className={`question question${item.id_module} step${
                      i + 1
                    }${i + 1 === this.state.step ? " active" : ""}`}
                  >
                    <h3 className={"mb-1"}>{item.nom}</h3>
                    {this._renderMecanique(item)}
                    <p className={"text-right mb-0 mt-4"}>
                      <Button
                        variant="primary"
                        disabled={!this.state.hasReponse}
                        onClick={() => this._saveReponse()}
                      >
                        Valider ma réponse
                      </Button>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className={"text-center"}>
                <h2 className={"color-primary-light mb-3 text-center"}>
                  Module terminé !
                </h2>
                <p className={"mb-0"}>Félicitations Explorateur.trice,</p>
                <p className={"mb-0"}>
                  Tu viens de terminer le module Manager une équipe en Mode
                  basique
                </p>
                <p className={"mb-0"}>
                  Tu vas maintenant accéder à ton score et aux réponses !
                </p>
                <p className={"text-right mb-0 mt-4"}>
                  <Button
                    variant="primary"
                  >
                    Résultats de l’exploration
                  </Button>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={"toolbar-right ml-0 ml-md-5"}>
          <div className={"chrono"}>
            <p className={"text-center mb-0"}>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/question/chronometre.svg"
                }
                alt={`Illustration Chronometre`}
                className={"illustration-chronometre"}
              />
            </p>
            <Stopwatch />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
    dataInitQuizz: state.quizz,
  };
};
export default connect(mapStateToProps)(Quizz);
