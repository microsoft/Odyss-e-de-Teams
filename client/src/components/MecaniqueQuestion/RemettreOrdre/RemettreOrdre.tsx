import React, { Component } from "react";
import { ListGroup, Form } from "react-bootstrap";

import {
  IMecaniqueQuestionProps,
  IReponse,
  IRemettreOrdreState,
} from "src/models/Question";

import "./RemettreOrdre.scss";

class RemettreOrdre extends Component<
  IMecaniqueQuestionProps,
  IRemettreOrdreState
> {
  constructor(props: IMecaniqueQuestionProps) {
    super(props);
    let ids: number[];
    if (props.isRecap) {
      let listReponseOrdreOK = [];
      this.props.question.reponse.forEach((id) => {
        listReponseOrdreOK.push(
          this.props.question.listReponse.find((r) => r.id_reponse === id)
        );
      });
      this.props.question.listReponse = listReponseOrdreOK;
      ids = this.props.question?.reponse_saisie;
    } else {
      ids = this.props.question?.listReponse?.map(
        (item: IReponse) => item.id_reponse
      );
    }
    let listReponseWithOrdre = [];
    ids.forEach((id: number, i: number) => {
      listReponseWithOrdre.push({ id: id, ordre: i });
    });
    this.state = {
      listReponseWithOrdre: listReponseWithOrdre,
    };
  }

  private _onChange = (item: IReponse, ordre: number) => {
    if (this.props.isRecap) {
      return;
    }
    let listReponseWithOrdre = this.state.listReponseWithOrdre;
    let currentOrdre = listReponseWithOrdre.find(
      (rep) => rep.id === item.id_reponse
    );
    let listReponseReorder;
    if (ordre < currentOrdre.ordre) {
      //si je descend l ordre, recalcul automatique de ceux en dessous qui s incremente
      listReponseReorder = listReponseWithOrdre.filter(
        (rep) => rep.ordre >= ordre && rep.ordre < currentOrdre.ordre
      );
      if (listReponseReorder.length > 0) {
        listReponseReorder.forEach((rep) => {
          rep.ordre++;
        });
      }
    } else if (ordre > currentOrdre.ordre) {
      //si je monte l ordre, recalcul automatique de ceux au dessus qui se decremente
      listReponseReorder = listReponseWithOrdre.filter(
        (rep) => rep.ordre <= ordre && rep.ordre > currentOrdre.ordre
      );
      if (listReponseReorder.length > 0) {
        listReponseReorder.forEach((rep) => {
          rep.ordre--;
        });
      }
    }

    currentOrdre.ordre = ordre;
    this.setState(
      {
        listReponseWithOrdre: listReponseWithOrdre,
      },
      () => {
        let selectedReponseOrder = this.state.listReponseWithOrdre.sort(
          (a: any, b: any) => {
            return a.ordre - b.ordre;
          }
        );
        this.props.onSelect(
          this.props.question,
          selectedReponseOrder.map((rep) => rep.id)
        );
      }
    );
  };

  private _renderListeDeroulante = (item: IReponse) => {
    return (
      <Form.Control
        as="select"
        disabled={this.props.isRecap}
        onChange={(e) => this._onChange(item, parseInt(e.target.value))}
        value={
          this.state.listReponseWithOrdre.find(
            (rep) => rep.id === item.id_reponse
          ).ordre
        }
      >
        {this.state.listReponseWithOrdre?.map((reponse: any, i: number) => {
          return (
            <option value={i} key={reponse.id + "-" + i}>
              {i + 1}
            </option>
          );
        })}
      </Form.Control>
    );
  };

  render() {
    const { isRecap } = this.props;

    return (
      <ListGroup className={"conteneur-reponse"}>
        {this.props.question?.listReponse?.map((item: IReponse, i: number) => {
          return (
            <ListGroup.Item
              key={item.id_reponse}
              className={`my-2 d-flex align-items-center justify-content-between active-reponse${
                isRecap &&
                (this.props.question.reponse_saisie.indexOf(item.id_reponse) ===
                this.props.question.reponse.indexOf(item.id_reponse)
                  ? " active-reponse-ok"
                  : " active-reponse-ko")
              }`}
            >
              <div className={"d-flex align-items-center"}>
                <p className={"mb-0 num_reponse"}>
                  <img
                    alt={`Reponse ${i + 1}`}
                    src={`${
                      process.env.PUBLIC_URL
                    }/images/question/reponse/reponse${i + 1}.png`}
                  />
                </p>
                <p className={"mb-0 pl-2"}>{item.nom}</p>
              </div>
              {/* {isRecap ? (
                <span className={"order"}>
                  Mon choix :{" "}
                  <strong>{this.props.question.reponse_saisie.indexOf(item.id_reponse) +
                    1}</strong>
                </span>
              ) : (
                this._renderListeDeroulante(item)
              )} */}
              {this._renderListeDeroulante(item)}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default RemettreOrdre;
