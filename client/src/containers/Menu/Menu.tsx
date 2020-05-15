import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';

import { IMenu, IMenuState } from "../../models/Menu";

import './Menu.scss';
import { getMenu } from "../../api/Api";

class Menu extends Component<{}, IMenuState> {

    constructor(props: any) {
        super(props);
        this.state = {
            listMenu: []
        };
    }

    componentDidMount() {
        this._loadMenu();
    }

    private _loadMenu = () => {
        getMenu('fr').then(data => {
            if (data.results) {
                this.setState({
                    listMenu: data.results
                });
            }
        });
    }

    render() {
        return (
            <div className={"menu py-4 d-flex flex-column justify-content-between"}>
                <p>Profil component</p>
                <ListGroup defaultActiveKey="/Cockpit">
                    {
                        this.state.listMenu?.map((data: IMenu) => {
                            return (
                                <ListGroup.Item  key={data.id_page} action href={data.router_link}>
                                    {data.nom}
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
                <p>Logo client</p>
            </div>
        );
    }
}

export default Menu;