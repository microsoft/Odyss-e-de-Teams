import React, { Component } from "react";
import { ListGroup, Form } from "react-bootstrap";

import {
  IMecaniqueQuestionProps,
  IReponse,
  IMecaniqueQuestionState,
} from "src/models/Question";

import "./RemettreOrdre.scss";

class RemettreOrdre extends Component<
  IMecaniqueQuestionProps,
  IMecaniqueQuestionState
> {
  constructor(props: IMecaniqueQuestionProps) {
    super(props);
    this.state = {
      selectedReponseIds: this.props.question?.listReponse?.map((item: IReponse) => item.id_reponse),
    };
  }

  private _onChange = (item: IReponse) => {
    console.log(item);
  };

  private _renderListeDeroulante = (item: IReponse) => {
    return  (
      <Form.Control as="select" onChange={() => this._onChange(item)}>
          {
            this.props.question?.listReponse?.map((reponse: IReponse, i: number) => {
              return (
                <option value={i} selected={i === this.state.selectedReponseIds.indexOf(item.id_reponse)}>{i + 1}</option>
              );
            })
          }
      </Form.Control>
    )
  };

  render() {
    return (
      <ListGroup className={"conteneur-reponse"}>
        {this.props.question?.listReponse?.map((item: IReponse, i: number) => {
          return (
            <ListGroup.Item
              key={item.id_reponse}
              className={`my-2 d-flex align-items-center justify-content-between`}
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
              {this._renderListeDeroulante(item)}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default RemettreOrdre;
