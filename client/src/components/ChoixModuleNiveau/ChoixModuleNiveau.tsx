import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { forkJoin } from "rxjs";
import styled, { keyframes } from "styled-components";
//@ts-ignore
import { fadeInUpBig } from "react-animations";

import QuestionAPI from "api/Question";

import {
  IModule,
  INiveau,
  IChoixModuleNiveauState,
  IChoixModuleNiveauProps,
} from "src/models/Question";

import "./ChoixModuleNiveau.scss";

const fadeInUpBigAnimation = keyframes`${fadeInUpBig}`;

const FadeInUpModule = styled.div`
  opacity: 0;
  animation-duration: 0.5s;
  animation-delay: 0.25s;
  animation-name: ${fadeInUpBigAnimation};
  animation-fill-mode: forwards;
`;

class ChoixModuleNiveau extends Component<
  IChoixModuleNiveauProps,
  IChoixModuleNiveauState
> {
  constructor(props: IChoixModuleNiveauProps) {
    super(props);
    this.state = {
      listNiveau: [],
      listModule: [],
    };
  }

  componentDidMount() {
    this._loadDataLancementJeu();
  }

  private _loadDataLancementJeu = () => {
    forkJoin([QuestionAPI.getModule("fr"), QuestionAPI.getNiveau("fr")])
      .toPromise()
      .then((data) => {
        this.setState({
          listModule: data[0].results ? data[0].results : [],
          listNiveau: data[1].results ? data[1].results : [],
        });
      });
  };

  private _onSelect = (module: IModule, niveau: INiveau) => {
    this.props.onSelect(module, niveau);
  };

  render() {
    return (
      <div className={"main-choix-module mb-0"}>
        <h2 className={"d-none d-md-block color-primary-light mb-2"}>
          Mission xx :{" "}
        </h2>
        <h2 className={"d-block d-md-none mb-2"}>Mission xx : </h2>
        <p className={"d-none d-md-block mb-2"}>
          Ta première mission est arrivée : ici commence ton exploration
          galactique à travers les usages collaboratifs de Teams
        </p>
        <h4 className={"mt-md-3 mb-2"}>
          Sélectionne un module et sa difficulté puis prépare-toi au décollage !
        </h4>
        <FadeInUpModule>
          <div className={"d-flex flex-column flex-md-row mt-4"}>
            {this.state.listModule?.map((item: IModule) => {
              return (
                <div
                  key={item.id_module}
                  className={`mx-1 module module${item.id_module}`}
                >
                  <div
                    className={
                      "content d-flex flex-column justify-content-between h-100 p-2"
                    }
                  >
                    <p className={"text-center mb-0"}>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/question/module/" +
                          item.image
                        }
                        alt={`Illustration module ${item.nom}`}
                        className={"illustration-module"}
                      />
                    </p>
                    <h4
                      className={
                        "d-flex align-items-center justify-content-center text-center color-primary-light h-100 mb-2"
                      }
                    >
                      {item.nom}
                    </h4>
                    <div className={"d-flex flex-column align-items-end"}>
                      {this.state.listNiveau?.map((itemNiv: INiveau) => {
                        return (
                          <Button
                            variant={"primary"}
                            key={itemNiv.id_niveau}
                            className={`w-100 mt-2 niveau niveau${itemNiv.id_niveau}`}
                            onClick={() => this._onSelect(item, itemNiv)}
                          >
                            {itemNiv.nom}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInUpModule>
      </div>
    );
  }
}

export default ChoixModuleNiveau;
