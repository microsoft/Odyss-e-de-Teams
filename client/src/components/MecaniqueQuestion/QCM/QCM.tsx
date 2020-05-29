import React, { Component } from "react";
import { ListGroup, Form } from "react-bootstrap";

import {
  IQCMProps,
  IReponse,
  IMecaniqueQuestionState,
} from "src/models/Question";

import "./QCM.scss";

class QCM extends Component<IQCMProps, IMecaniqueQuestionState> {
  constructor(props: IQCMProps) {
    super(props);
    this.state = {
      selectedReponseIds: [],
    };
  }

  private _onSelect = (item: IReponse) => {
    let selectedReponseIds: number[] = [];
    if (!this.props.multiple) {
      selectedReponseIds = [item.id_reponse];
    } else {
      //qcm multiple
      if (
        this.state.selectedReponseIds &&
        this.state.selectedReponseIds.length > 0
      ) {
        if (this.state.selectedReponseIds.indexOf(item.id_reponse) !== -1) {
          //deja present donc action = décocher
          selectedReponseIds = this.state.selectedReponseIds.filter(
            (id) => id !== item.id_reponse
          );
        } else {
          selectedReponseIds = this.state.selectedReponseIds;
          selectedReponseIds.push(item.id_reponse);
        }
      } else {
        selectedReponseIds = [item.id_reponse];
      }
    }
    this.setState(
      {
        selectedReponseIds: selectedReponseIds,
      },
      () => {
        this.props.onSelect(item, this.state.selectedReponseIds);
      }
    );
  };
  render() {
    return (
      <ListGroup className={"conteneur-reponse"}>
        {this.props.question?.listReponse?.map((item: IReponse, i: number) => {
          return (
            <ListGroup.Item
              key={item.id_reponse}
              className={`my-2 d-flex align-items-center pointer${
                this.state.selectedReponseIds?.indexOf(item.id_reponse) !== -1
                  ? " active"
                  : ""
              }`}
              onClick={() => this._onSelect(item)}
            >
              <Form.Check
                checked={this.state.selectedReponseIds?.indexOf(item.id_reponse) !== -1}
                type={"checkbox"}
                id={`cb-reponse-${item.id_reponse}`}
                aria-label={`Check réponse`}
                onClick={() => this._onSelect(item)}
                className={`${!this.props.multiple ? 'd-none' : ''}`}
              />
              <p className={"mb-0 num_reponse"}>
                <img
                  alt={`Reponse ${i + 1}`}
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/question/reponse/reponse${i + 1}.png`}
                />
              </p>
              <p className={"mb-0 pl-2"}>{item.nom}</p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default QCM;
