import React, { Component } from "react";
import { forkJoin } from 'rxjs';
import { Button, Table, ButtonGroup } from 'react-bootstrap';

import { getClassement } from "../../api/Api";

import { IClassementState, IClassement } from "../../models/Classement";

import './Classement.scss';

class Classement extends Component<{}, IClassementState> {
    constructor(props: any) {
        super(props);
        this.state = {
            listUser: [],
            currentView: 'point',
            viewMonde: false
        };
    }

    componentDidMount() {
        this._loadDataClassement();
    }

    private _loadDataClassement = () => {
        forkJoin([
            getClassement('fr', this.state.currentView, (this.state.viewMonde ? 1 : 0)),
            getClassement('fr', this.state.currentView, (this.state.viewMonde ? 1 : 0), 1)
        ]).toPromise().then(data => {
            this.setState({
                listUser: data[0] ? data[0] : [],
                classementCurrentUser: data[1]
            });
        });
    }

    private _setCurrentView = (view: string) => {
        this.setState({
            currentView: view
        }, () => {
            this._loadDataClassement();
        });
    }

    private _setViewMonde = () => {
        this.setState({
            viewMonde: !this.state.viewMonde
        }, () => {
            this._loadDataClassement();
        });
    }

    private _calculMauvaiseReponse = (item: IClassement) => {
        if (item && item.nb_reponse && item.nb_reponse > 0) {
            return item.nb_reponse - (item.nb_reponse_ok ? item.nb_reponse_ok : 0);
        }
        return 0;
    }

    private _renderPoint(item: IClassement) {
        switch (this.state.currentView) {
            case 'xp':
                return item?.nb_xp;
            default:
                return item?.nb_point;
        }
    }
    render() {
        return (
            <div>
                <h1 className={"color-primary"}>Classements du programme en cours</h1>
                <div className={"main-encart main-classement"}>
                    <h2 className={"color-primary-light mb-4"}>Programme du</h2>
                    <div className={"d-none d-md-block mb-3"}>   {/* btn vu dekstop */}
                        <Button variant={this.state.currentView === 'point' ? 'primary' : 'secondary'} onClick={() => this._setCurrentView('point')} className={"mr-3"}>
                            <img src={process.env.PUBLIC_URL + '/images/icone/cup.png'} alt="Ico Classement Général" className={"btn-ico"} />
                            Classement général
                        </Button>
                        <Button variant={this.state.currentView === 'xp' ? 'primary' : 'secondary'} onClick={() => this._setCurrentView('xp')} className={"mr-3 d-inline-flex align-items-center"}>
                            <img src={process.env.PUBLIC_URL + '/images/icone/coin.png'} alt="Ico Classement EXP" className={"btn-ico"} />
                            Classement points EXP
                        </Button>
                        <Button variant={this.state.viewMonde ? 'primary' : 'secondary'} onClick={() => this._setViewMonde()} className={"mr-3 d-inline-flex align-items-center"}>
                            <img src={process.env.PUBLIC_URL + '/images/icone/monde.png'} alt="Ico Classement monde" className={"btn-ico"} />
                            Classement monde
                        </Button>
                    </div>
                    <div className={"d-md-none mb-3"}>   {/* btn vu mobile */}
                        <ButtonGroup aria-label="Filtre du classement" className={"mr-3"}>
                            <Button variant={this.state.currentView === 'point' ? 'primary' : 'secondary'} onClick={() => this._setCurrentView('point')}>
                                Classement général
                            </Button>
                            <Button variant={this.state.currentView === 'xp' ? 'primary' : 'secondary'} onClick={() => this._setCurrentView('xp')} className={"mr-3"}>
                                Classement points EXP
                            </Button>
                            <Button variant={this.state.viewMonde ? 'primary' : 'secondary'} onClick={() => this._setViewMonde()}>
                                monde
                            </Button>
                        </ButtonGroup>
                    </div>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Explorateur.trice</th>
                                <th>Points classement</th>
                                <th>Bonnes réponses</th>
                                <th>Mauvaises réponses</th>
                                <th>Questionnaires complétés</th>
                                <th>Niveau</th>
                                <th>Médailles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listUser?.map((item: IClassement) => {
                                    return (
                                        <tr key={item.id_user} className={`rang${item.rang}`}>
                                            <td>{item.rang}</td>
                                            <td>
                                                <div className={"d-flex align-items-center"}>
                                                    {
                                                        item.image_avatar ? (
                                                            <p className={"avatar"}>
                                                                <img src={process.env.PUBLIC_URL + item.image_avatar} alt="Avatar" />
                                                            </p>
                                                        ) : <span className={"d-none"}></span>
                                                    }
                                                    <p className={"mb-0 pb-0"}>{item.nom}</p>
                                                </div>

                                            </td>
                                            <td>{this._renderPoint(item)}</td>
                                            <td>{item.nb_reponse_ok ? item.nb_reponse_ok : 0}</td>
                                            <td>{this._calculMauvaiseReponse(item)}</td>
                                            <td>{item.nb_questionnaire_complete}</td>
                                            <td>{item.niveau}</td>
                                            <td>{item.nb_medaille}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>{this.state.classementCurrentUser?.rang}</td>
                                <td>
                                    {this.state.classementCurrentUser?.nom}
                                </td>
                                <td>{this._renderPoint(this.state.classementCurrentUser)}</td>
                                <td>{this.state.classementCurrentUser?.nb_reponse_ok ? this.state.classementCurrentUser?.nb_reponse_ok : 0}</td>
                                <td>{this._calculMauvaiseReponse(this.state.classementCurrentUser)}</td>
                                <td>{this.state.classementCurrentUser?.nb_questionnaire_complete}</td>
                                <td>{this.state.classementCurrentUser?.niveau}</td>
                                <td>{this.state.classementCurrentUser?.nb_medaille}</td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Classement;