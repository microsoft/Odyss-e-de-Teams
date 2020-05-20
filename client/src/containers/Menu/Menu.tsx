import React, { Component } from "react";
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import UserAvatar from "../../components/UserAvatar/UserAvatar";

import { IMenu, IMenuState, IMenuProps } from "../../models/Menu";
import IStore from "../../store/IStore";

import { getMenu } from "../../api/Api";

import './Menu.scss';

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
            <div className={"d-none d-md-flex menu py-4 flex-column"}>
                <UserAvatar user={currentUser} />
                <div className={"d-flex flex-column justify-content-between h-100"}>
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
                    <p className={"text-center"}>Logo client</p>
                </div>
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