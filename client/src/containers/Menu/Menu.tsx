import React, { Component } from "react";
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { IMenu, IMenuState, IMenuProps } from "../../models/Menu";

import './Menu.scss';
import { getMenu } from "../../api/Api";
import IStore from "../../store/IStore";

class Menu extends Component<IMenuProps, IMenuState> {

    constructor(props: IMenuProps) {
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
        const { currentRouterLink, currentUser } = this.props;
        return (
            <div className={"menu py-4 d-flex flex-column justify-content-between"}>
                <p>Profil component - {currentUser?.nom} </p>
                <ListGroup defaultActiveKey={'/#' + currentRouterLink}>
                    {
                        this.state.listMenu?.map((item: IMenu) => {
                            const itemStyle = {
                                backgroundImage: "url('" + process.env.PUBLIC_URL + "/images/menu/" + item.picto + "')"
                            };
                            return (
                                <ListGroup.Item key={item.id_page} action href={item.router_link} style={itemStyle}>
                                    {item.nom}
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
const mapStateToProps = (state: IStore) => {
    return {
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps)(Menu)