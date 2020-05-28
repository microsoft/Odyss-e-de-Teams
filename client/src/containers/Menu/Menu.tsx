import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import UserAvatar from "../../components/UserAvatar/UserAvatar";

import { IMenu, IMenuState, IMenuProps } from "../../models/Menu";
import IStore from "../../store/IStore";

import MenuAPI from "api/Menu";
import OrganisationAPI from "api/Organisation";

import "./Menu.scss";

class Menu extends Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      listMenu: [],
      organisationLogo: null,
    };
  }

  async componentDidMount() {
    try {
      const orgaInfos = await OrganisationAPI.getOrganisationInfos(
        this.props.currentUser.id_organisation
      );
      const menu = await MenuAPI.getMenu("fr");

      this.setState({
        listMenu: menu.results,
        organisationLogo: orgaInfos.logo
          ? process.env.REACT_APP_STATIC_URL + "/" + orgaInfos.logo
          : null,
      });
    } catch (e) {
      console.error("Menu error", e);
    }
  }

  render() {
    const { currentRouterLink, currentUser } = this.props;
    const { organisationLogo } = this.state;

    return (
      <div className={"d-none d-md-flex menu py-4 flex-column"}>
        <UserAvatar user={currentUser} />
        <div className={"d-flex flex-column justify-content-between h-100"}>
          <ListGroup defaultActiveKey={"/#" + currentRouterLink}>
            {this.state.listMenu?.map((item: IMenu) => {
              const itemStyle = {
                backgroundImage:
                  "url('" +
                  process.env.PUBLIC_URL +
                  "/images/menu/" +
                  item.picto +
                  "')",
              };
              return (
                <ListGroup.Item
                  key={item.id_page}
                  action
                  href={item.router_link}
                  style={itemStyle}
                >
                  {item.nom}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <div className="menu__logo">
            {!organisationLogo && <p className={"text-center"}>Logo client</p>}
            {organisationLogo && <img src={organisationLogo} alt="logo" />}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Menu);
