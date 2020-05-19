import React, { Component } from "react";
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import { getMedaille } from "../../api/Api";

import { IProfilProps, IProfilState, IMedaille } from "../../models/User";
import IStore from "../../store/IStore";

import './Profil.scss';

class Profil extends Component<IProfilProps, IProfilState> {
    constructor(props: IProfilProps) {
        super(props);
        this.state = {
            listMedaille: [],
            showModalProfil: false
        };
    }

    componentDidMount() {
        this._loadMedaille();
    }

    private _loadMedaille = () => {
        getMedaille('fr').then(data => {
            if (data.results) {
                this.setState({
                    listMedaille: data.results
                });
            }
        });
    }

    private _setShowModalProfil =(show: boolean) => {
        this.setState({
            showModalProfil: show
        });
    }

    render() {
        console.log(this.props.currentUser);
        console.log(this.state.listMedaille);
        return (
            <div>
                <h1 className={"color-primary"}>Mon profil de jeu</h1>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={6}>
                            <Container fluid>
                                <Row>
                                    <Col className={"main-encart"}>
                                        <h2 className={"color-primary-light"}>Mon niveau</h2>
                                        <div className={"d-flex"}>
                                            {
                                                this.props.currentUser?.image_avatar ? (
                                                    <img src={process.env.PUBLIC_URL + this.props.currentUser.image_avatar} alt="Avatar" />
                                                ) : <span className={"d-none"}></span>
                                            }
                                            <div>
                                                <p className={"h1 mb-0 pt-0 color-primary"}>Niveau {this.props.currentUser?.niveau}</p>
                                                <div>
                                                    Total points d'EXP : <strong className={"color-primary"}>{this.props.currentUser?.nb_xp}</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={"text-right"}>
                                            <Button variant="primary" onClick={() => this._setShowModalProfil(true)}>Personnaliser mon avatar</Button>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={"main-encart"}>
                                        <h2 className={"color-primary-light"}>Mes statistiques d'exploration</h2>
                                        <Row>
                                            <Col>
                                                <p className={"h1 mb-0 pt-0 color-primary"}>{this.props.currentUser?.nb_questionnaire_complete}</p>
                                                <p>Questionnaires complétés</p>
                                            </Col>
                                            <Col>
                                                <p className={"h1 mb-0 pt-0 color-primary"}>
                                                    {
                                                        this.props.currentUser?.nb_reponse > 0 ? (
                                                            <span>{100 * this.props.currentUser?.nb_reponse_ok / this.props.currentUser?.nb_reponse}</span>
                                                        ) : <span>0</span>
                                                    }
                                                    <sup>%</sup>
                                                </p>
                                                <p>Bonnes réponses</p>
                                            </Col>
                                            <Col>
                                                <p className={"h1 mb-0 pt-0 color-primary"}>{this.props.currentUser?.nb_reponse_consecutive_top}</p>
                                                <p>Bonnes réponses consécutives</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className={"h1 mb-0 pt-0 color-primary"}>0<sup>ème</sup></p>
                                                <p>Classement actuel EXP</p>
                                            </Col>
                                            <Col>
                                                <p className={"h1 mb-0 pt-0 color-primary"}>0<sup>ème</sup></p>
                                                <p>Classement actuel points</p>
                                            </Col>
                                            <Col></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} md={6} className={"main-encart"}>
                            <h2 className={"color-primary-light d-none d-md-block"}>Ma collection de récompenses d'honneur</h2>
                            <h2 className={"color-primary-light d-block d-md-none"}>Ma collection de médailles</h2>
                            <div className={"d-none d-md-block"}>Au cours de ton voyage, tu pourras choisir jusqu’à 3 médailles parmi celles que tu auras obtenues pour les exhiber partout sur ton tableau de board. Il te sera également possible d’en choisir une comme image d’Avatar, de quoi faire pâlir de jalousie la communauté d’Explorateurs !</div>
                            <h3 className={"d-none d-md-block mt-2"}>Liste des médailles</h3>
                            <p className={"color-primary mt-3 mb-1"}>Médailles communes {this.state.listMedaille?.filter(m => !m.legendaire).length}</p>
                            {
                                this.state.listMedaille?.filter(m => !m.legendaire).map((item: IMedaille) => {
                                    return (
                                        <img width="70" key={item.id_medaille} src={process.env.PUBLIC_URL + '/images/medaille/' + item.image} alt={"Médaille " + item.nom} />
                                    )
                                })
                            }
                            <p className={"color-primary mt-3 mb-1"}>Médailles légendaires {this.state.listMedaille?.filter(m => m.legendaire).length}</p>
                            {
                                this.state.listMedaille?.filter(m => m.legendaire).map((item: IMedaille) => {
                                    return (
                                        <img width="70" key={item.id_medaille} src={process.env.PUBLIC_URL + '/images/medaille/' + item.image} alt={"Médaille " + item.nom} />
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Container>
                <Modal show={this.state.showModalProfil} onHide={() => this._setShowModalProfil(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">
                            Annuler
                        </Button>
                        <Button variant="primary">
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
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps)(Profil)