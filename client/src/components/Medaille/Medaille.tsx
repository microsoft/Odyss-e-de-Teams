import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import { IMedailleProps, IMedaille } from "../../models/Medaille";

import './Medaille.scss';

class Medaille extends Component<IMedailleProps, {}> {

    private _renderTooltip = (medaille: IMedaille) => {
        return (
            <Tooltip id="medaille-tooltip">
                <p className={"h3"}>{medaille.nom}</p>
                {medaille.description}
            </Tooltip>
        );
    }
    private _onClickMedaille = (medaille: IMedaille) => {
        if (this.props.canSelect) {
            this.props.onSelect(this.props.selected ? null : medaille);
        }
    }

    render() {
        const { medaille, canSelect, selected } = this.props;
        return (
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={this._renderTooltip(medaille)}
            >
                {
                    medaille.unlock ? (
                        <img className={`medaille ${canSelect ? 'pointer' : ''} ${selected ? 'selected' : ''}`} onClick={() => this._onClickMedaille(medaille)} src={process.env.PUBLIC_URL + '/images/medaille/' + medaille.image} alt={"Médaille " + medaille.nom} />
                    ) : (
                        <img className={"medaille"} src={process.env.PUBLIC_URL + '/images/medaille/lock.png'} alt={"Médaille " + medaille.nom} />
                    )
                }
            </OverlayTrigger>
        );
    }
}

export default Medaille;