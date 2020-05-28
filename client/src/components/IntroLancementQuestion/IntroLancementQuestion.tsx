import React, { Component } from "react";
import { Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
//@ts-ignore
import { fadeIn } from "react-animations";

import { IIntroLancementQuestionProps } from "src/models/Question";

import "./IntroLancementQuestion.scss";

const fadeInAnimation = keyframes`${fadeIn}`;

const FadeInIntro = styled.div`
  opacity: 0;
  animation-duration: 0.5s;
  animation-delay: 0.25s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;

class IntroLancementQuestion extends Component<
  IIntroLancementQuestionProps,
  {}
> {
  private _onClick = () => {
    this.props.onValid();
  };

  render() {
    return (
      <FadeInIntro>
        <div className={"main-intro m-0 px-4 py-4 px-md-0 pt-md-0 pb-md-2"}>
          <h2 className={"d-none d-md-block color-primary-light mb-2"}>
            {this.props.selectedModule?.nom} - {this.props.selectedNiveau?.nom}
          </h2>
          <h2 className={"d-block d-md-none mb-2"}>
            {this.props.selectedModule?.nom} - {this.props.selectedNiveau?.nom}
          </h2>
          <p className={"d-none d-md-block mb-2"}>
            Derniers préparatifs avant le décollage
          </p>
          <h4 className={"d-none d-md-block mt-md-3 mb-2"}>
            Seras-tu capable de répondre à la vitesse de la lumière ?
          </h4>
          <p className={"text-center mb-0"}>
            <img
              src={process.env.PUBLIC_URL + "/images/question/chronometre.svg"}
              alt={`Illustration Chronometre`}
              className={"illustration-chronometre"}
            />
          </p>
          <p className={"text-center content mx-auto"}>
            Explorateur.trice, le chronomètre va te permettre de gagner{" "}
            <strong className={"color-primary-light"}>
              5 points d’XP supplémentaires si tu réponds en dessous des 30
              secondes
            </strong>{" "}
            à chaque bonnes réponses.
          </p>
          <p className={"text-center content mx-auto"}>
            Mais rassure-toi ! Au delà de ce temps, il ne te fera pas perdre de
            points !
          </p>
          <p className={"text-right"}>
            <Button
              variant="primary"
              className={"d-inline-block"}
              onClick={() => this._onClick()}
            >
              Commençons l'exploration
            </Button>
          </p>
        </div>
      </FadeInIntro>
    );
  }
}

export default IntroLancementQuestion;
