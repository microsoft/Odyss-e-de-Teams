import React, { Component } from "react";
import { Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
//@ts-ignore
import { fadeIn, fadeInUpBig } from "react-animations";

import "./Regle.scss";

const fadeInAnimation = keyframes`${fadeIn}`;
const fadeInUpBigAnimation = keyframes`${fadeInUpBig}`;

const FadeInStep1 = styled.div`
  opacity: 0;
  animation-duration: 1s;
  animation-delay: 1s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;
const FadeInStep2 = styled.div`
  opacity: 0;
  animation-duration: 1s;
  animation-delay: 1.5s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;
const FadeInStep3 = styled.div`
  opacity: 0;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;
const FadeInStep4 = styled.div`
  opacity: 0;
  animation-duration: 1s;
  animation-delay: 2.5s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;

const FadeInUpCartouche = styled.div`
  opacity: 0;
  animation-duration: 0.25s;
  animation-delay: 0.25s;
  animation-name: ${fadeInUpBigAnimation};
  animation-fill-mode: forwards;
`;

class Regle extends Component {
  render() {
    return (
      <div>
        <h1 className={"color-primary d-none d-md-block"}>
          Notes d’exploration et récompenses
        </h1>
        <h1 className={"color-white d-flex d-md-none justify-content-center"}>
          <img
            src={process.env.PUBLIC_URL + "/images/icone/bouclier.png"}
            alt="Ico Regles"
            className={"ico-titre"}
          />
          Règles du jeu
        </h1>

        <div className={"main-encart nobg-mobile main-regle"}>
          <h2 className={"d-none d-md-block color-primary-light mb-2"}>
            Un programme d’un mois pour voyager au coeur des usages Teams
          </h2>
          <div className={"d-flex steps mt-3 mt-md-5"}>
            <FadeInStep1
              className={
                "step step1 text-center d-flex flex-column align-items-center"
              }
            >
              <img
                src={process.env.PUBLIC_URL + "/images/regle/step1_desktop.png"}
                alt="Ico Jouer"
                className={"d-none d-md-inline"}
              />
              <img
                src={process.env.PUBLIC_URL + "/images/regle/step1_mobile.png"}
                alt="Ico gain"
                className={"d-inline d-md-none"}
              />
              <div className={"step-content"}>
                <p className={"num-step mx-md-auto mb-0"}>1</p>
                <p className={"text-center mt-2 mb-0"}>
                  Réponds aux 3 niveaux de questions toutes les semaines
                </p>
              </div>
            </FadeInStep1>
            <FadeInStep2
              className={
                "step step2 text-center d-flex flex-column align-items-center mx-md-4"
              }
            >
              <img
                src={process.env.PUBLIC_URL + "/images/regle/step2_desktop.png"}
                alt="Ico points"
                className={"d-none d-md-inline"}
              />
              <img
                src={process.env.PUBLIC_URL + "/images/regle/step2_mobile.png"}
                alt="Ico gain"
                className={"d-inline d-md-none"}
              />
              <div className={"step-content"}>
                <p className={"num-step mx-md-auto mb-0"}>2</p>
                <p className={"text-center mt-2 mb-0"}>
                  Obtiens des points de jeu, des points d’EXP, des médailles et
                  d’autres récompenses
                </p>
              </div>
            </FadeInStep2>
            <FadeInStep3
              className={
                "step step3 text-center d-flex flex-column align-items-center mx-md-4"
              }
            >
              <img
                src={process.env.PUBLIC_URL + "/images/regle/step3_desktop.png"}
                alt="Ico galaxie"
                className={"d-none d-md-inline"}
              />
              <img
                src={process.env.PUBLIC_URL + "/images/regle/step3_mobile.png"}
                alt="Ico gain"
                className={"d-inline d-md-none"}
              />
              <div className={"step-content"}>
                <p className={"num-step mx-md-auto mb-0"}>3</p>
                <p className={"text-center mt-2 mb-0"}>
                  Renforce ton vaisseau et améliore tes classements en
                  parcourant les 5 modules de questions
                </p>
              </div>
            </FadeInStep3>
            <FadeInStep4 className={"step step4 text-center"}>
              <div className={"step-content"}>
                <p className={"num-step mx-auto mb-0"}>4</p>
                <img
                  src={
                    process.env.PUBLIC_URL + "/images/regle/step4_mobile.png"
                  }
                  alt="Ico gain"
                  className={"d-inline d-md-none"}
                />
                <p className={"text-center mt-2 mb-0"}>
                  En plus des connaissances et de la gloire, remporte des
                  cadeaux et des goodies.
                </p>
              </div>
            </FadeInStep4>
          </div>
            <FadeInUpCartouche>
              <p className={"btn-download mt-2 pb-md-2"}>
                <Button as="a"
                  variant="primary"
                  className={"d-inline-block"}
                  href={`${process.env.PUBLIC_URL}/download/Odyssee-Teams_Reglement.pdf`}
                  target="_blank"
                >
                  Télécharger les règles du jeu
                </Button>
              </p>
            </FadeInUpCartouche>
          {/* suppression demande client
           <FadeInUpCartouche>
            <Container fluid className={"d-none d-md-block mt-4"}>
              <Row>
                <Col md={4}>
                  <div className={"cartouche px-4 py-3"}>
                    <h4>Un programme et 4 missions</h4>
                    <div className={"content"}>
                      Un programme se compose de missions pendant lesquelles tu
                      pourras apprendre les usages et les secrets de Teams par
                      le biais de multiples modules de questions tous plus fun
                      les uns que les autres !
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={"cartouche px-4 py-3"}>
                    <h4>Devenir un TOP Explorateur</h4>
                    <div className={"content"}>
                      Collecte des points d’EXP et de classement en répondant
                      aux questionnaires et en te connectant chaque jour ! Ces
                      points te permettront de te distinguez et de te hisser au
                      sommet de chaque classement !
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={"cartouche px-4 py-3"}>
                    <h4>De formidables récompenses</h4>
                    <div className={"content"}>
                      À la fin du programme, tous les Explorateurs.trices du TOP
                      des classements recevront des prix fantastiques en plus
                      des nombreuses médailles d’honneur et des bonus
                      journaliers. Surpasse-toi !
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </FadeInUpCartouche> */}
        </div>{/* 
        <p className={"powered mt-md-2 pb-md-2 color-black2"}>
          <small><em>Created by <a href="http://saegus.com/" target="_blank" className={"color-black2"}>Saegus</a></em></small>
        </p> */}
      </div>
    );
  }
}

export default Regle;
