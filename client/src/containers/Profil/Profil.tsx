import React, { Component } from "react";
import { forkJoin } from "rxjs";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { withTranslation, WithTranslation } from "react-i18next";

import UserAPI from "api/User";
import ClassementAPI from "api/Classement";

import Medaille from "../../components/Medaille/Medaille";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import LevelBar from "components/molecules/LevelBar/LevelBar";

import { IProfilProps, IProfilState } from "../../models/User";
import { IMedaille } from "../../models/Medaille";
import IStore from "../../store/IStore";

import "./Profil.scss";

class Profil extends Component<IProfilProps & WithTranslation, IProfilState> {
  constructor(props: IProfilProps & WithTranslation) {
    super(props);
    this.state = {
      listMedaille: [],
      showModalProfil: false,
    };
  }

  componentDidMount() {
    this._loadCurrentUser();
    this._loadDataProfil();
  }

  private _loadDataProfil = () => {
    UserAPI.checkNewMedal().then(() => {
      forkJoin([
        UserAPI.getMedaille("fr"),
        ClassementAPI.getClassement("fr", "xp", 0, 1),
        ClassementAPI.getClassement("fr", "point", 0, 1),
        UserAPI.checkLevelUp(),
      ])
        .toPromise()
        .then((data) => {
          let listMedaille = data[0].results ? data[0].results : [];
          this.setState({
            listMedaille: listMedaille,
            classementXP: data[1] ? parseInt(data[1].rang) : 0,
            classementPoint: data[2] ? parseInt(data[2].rang) : 0,
            dataLevelUp: data[3],
          });
        });
    });
  };

  private _setShowModalProfil = (show: boolean) => {
    this.setState({
      showModalProfil: show,
    });
  };

  private _selectMedailleAvatar = (medaille: IMedaille) => {
    this.setState({
      hasUpdatedMedailleAvatar: true,
      selectedMedailleAvatar: medaille,
    });
  };

  private _saveMedailleAvatar = () => {
    UserAPI.setMedailleAvatar(
      this.state.selectedMedailleAvatar?.id_medaille
    ).then((data: any) => {
      this._loadCurrentUser();
      this._setShowModalProfil(false);
    });
  };

  private _loadCurrentUser = () => {
    UserAPI.getUser("fr", "current").then((data) => {
      const action_liste = { type: "SET_CURRENT_USER", value: data };
      this.props.dispatch(action_liste);
    });
  };

  render() {
    return (
      <div>
        <h1 className={"color-primary"}>Mon profil de jeu</h1>
        <Row>
          <Col xs={12} md={6}>
            <Container fluid>
              <Row>
                <Col className={"main-encart"}>
                  <h2 className={"color-primary-light mb-2"}>Mon niveau</h2>
                  <div className={"d-flex"}>
                    <div className={"flex-1"}>
                      {this.props.currentUser?.image_avatar ? (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            this.props.currentUser.image_avatar
                          }
                          alt="Avatar"
                          className={"mw-100"}
                        />
                      ) : (
                        <span className={"d-none"}></span>
                      )}
                    </div>
                    <div className={"flex-1 flex-grow-3 pl-2 pl-md-5"}>
                      <p className={"h1 mb-2 pt-0 color-primary"}>
                        Niveau {this.props.currentUser?.niveau}
                      </p>
                      <div className={"total_xp"}>
                        Total points d'EXP :{" "}
                        <strong className={"color-primary"}>
                          {this.props.currentUser?.nb_xp}
                        </strong>
                      </div>
                      <div className={"mb-3"}>
                        <LevelBar
                          currentXP={this.props.currentUser?.nb_xp}
                          nextXP={this.state.dataLevelUp?.nb_xp}
                          nextLevel={this.state.dataLevelUp?.level}
                          src={"profil"}
                        />
                      </div>
                    </div>
                  </div>
                  <p className={"text-right"}>
                    <Button
                      variant="primary"
                      onClick={() => this._setShowModalProfil(true)}
                    >
                      Personnaliser mon avatar
                    </Button>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className={"main-encart"}>
                  <h2 className={"color-primary-light mb-3"}>
                    Mes statistiques d'exploration
                  </h2>
                  <Row>
                    <Col>
                      <p className={"h1 mb-0 pt-0 color-primary"}>
                        {this.props.currentUser?.nb_questionnaire_complete}
                      </p>
                      <p>Questionnaires complétés</p>
                    </Col>
                    <Col>
                      <p className={"h1 mb-0 pt-0 color-primary"}>
                        {this.props.currentUser?.nb_reponse > 0 ? (
                          <span>
                            {(
                              (100 * this.props.currentUser?.nb_reponse_ok) /
                              this.props.currentUser?.nb_reponse
                            ).toFixed(2)}
                          </span>
                        ) : (
                          <span>0</span>
                        )}
                        <sup>%</sup>
                      </p>
                      <p>Bonnes réponses</p>
                    </Col>
                    <Col>
                      <p className={"h1 mb-0 pt-0 color-primary"}>
                        {this.props.currentUser?.nb_reponse_consecutive_top}
                      </p>
                      <p>Bonnes réponses consécutives</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className={"h1 mb-0 pt-0 color-primary"}>
                        {this.state.classementXP ? this.state.classementXP : 0}
                        <sup>
                          {this.state.classementPoint &&
                          this.state.classementPoint === 1
                            ? "er"
                            : "ème"}
                        </sup>
                      </p>
                      <p>Classement actuel EXP</p>
                    </Col>
                    <Col>
                      <p className={"h1 mb-0 pt-0 color-primary"}>
                        {this.state.classementPoint
                          ? this.state.classementPoint
                          : 0}
                        <sup>
                          {this.state.classementPoint &&
                          this.state.classementPoint === 1
                            ? "er"
                            : "ème"}
                        </sup>
                      </p>
                      <p>Classement actuel points</p>
                    </Col>
                    <Col></Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={12} md={6}>
            <div className={"main-encart"}>
              <h2 className={"color-primary-light d-none d-md-block mb-2"}>
                Ma collection de récompenses d'honneur
              </h2>
              <h2 className={"color-primary-light d-block d-md-none mb-2"}>
                Ma collection de médailles
              </h2>
              <div className={"d-none d-md-block"}>
                Au cours de ton voyage, tu pourras choisir jusqu’à 3 médailles
                parmi celles que tu auras obtenues pour les exhiber partout sur
                ton tableau de board. Il te sera également possible d’en choisir
                une comme image d’Avatar, de quoi faire pâlir de jalousie la
                communauté d’Explorateurs !
              </div>
              <h3 className={"d-none d-md-block mt-2"}>Liste des médailles</h3>
              <p className={"color-primary mt-3 mb-1"}>
                Médailles communes{" "}
                {this.state.listMedaille?.filter((m) => !m.legendaire).length}
              </p>
              <div className={"d-flex flex-wrap"}>
                {this.state.listMedaille
                  ?.filter((m) => !m.legendaire)
                  .map((item: IMedaille) => {
                    return <Medaille medaille={item} key={item.id_medaille} />;
                  })}
              </div>
              <p className={"color-primary mt-3 mb-1"}>
                Médailles légendaires{" "}
                {this.state.listMedaille?.filter((m) => m.legendaire).length}
              </p>
              <div className={"d-flex flex-wrap"}>
                {this.state.listMedaille
                  ?.filter((m) => m.legendaire)
                  .map((item: IMedaille) => {
                    return <Medaille medaille={item} key={item.id_medaille} />;
                  })}
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          show={this.state.showModalProfil}
          onHide={() => this._setShowModalProfil(false)}
          dialogClassName="modal-profil"
          centered
        >
          <Modal.Body>
            <h2 className={"color-primary-light"}>Personnalise ton avatar</h2>
            <div className={"container-avatar-user"}>
              <UserAvatar user={this.props.currentUser} />
            </div>
            <p className={"text-center"}>
              Clique sur la médaille que tu souhaites mettre à la place de ton
              avatar.
            </p>
            {this.state.listMedaille?.map((item: IMedaille) => {
              return (
                <Medaille
                  key={item.id_medaille}
                  medaille={item}
                  canSelect={true}
                  onSelect={this._selectMedailleAvatar}
                  selected={
                    this.state.hasUpdatedMedailleAvatar
                      ? this.state.selectedMedailleAvatar?.id_medaille ===
                        item.id_medaille
                      : this.props.currentUser?.id_medaille_avatar ===
                        item.id_medaille
                  }
                />
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this._setShowModalProfil(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              disabled={!this.state.hasUpdatedMedailleAvatar}
              onClick={() => this._saveMedailleAvatar()}
            >
              Valider mes modifications
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default withTranslation()(connect(mapStateToProps)(Profil));
