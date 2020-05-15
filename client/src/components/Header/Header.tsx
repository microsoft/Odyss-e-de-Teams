import React, { Component } from "react";

import { IHeaderProps } from "../../models/Header";

import './Header.scss';

class Header extends Component<IHeaderProps, {}> {

    render() {
        const { hasGradient } = this.props;
        let logo:string = hasGradient ? 'logo_gauche_violet.png' : 'logo_gauche_blanc.png';
        return (
            <div className={"d-none d-md-block"}>
                <img src={process.env.PUBLIC_URL + '/images/logo/' + logo} alt="Logo" width="300" />
            </div>
        );
    }
}

export default Header;