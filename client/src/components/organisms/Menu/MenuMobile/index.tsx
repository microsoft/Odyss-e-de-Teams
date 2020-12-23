import React, { useState } from "react";
import i18n from '../../../../config/i18n';

import "./style.scss";
import { IMenuProps, IMenuState, IMenu } from "models/Menu";

import MenuAPI from "api/Menu";
import { ListGroup } from "react-bootstrap";

class MenuMobile extends React.Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      listMenu: [],
      organisationLogo: null,
    };
  }
  async componentDidMount() {
    try {
      const menu = await MenuAPI.getMenu(i18n.language);
      this.setState(
        {
          listMenu: menu.results,
          organisationLogo: null,
          displayMenu: false
        }
      );
    } catch (e) {
      console.error("Menu error", e);
    }
  }

  private _setDisplayMenu = () => {
    this.setState({
      displayMenu: !this.state.displayMenu
    })
  }

  render() {
    const { currentRouterLink } = this.props;

    return (
      <div
        className={`MenuMobile col-12 p-0 ${
          this.state.displayMenu ? "MenuMobile__expand" : ""
        }`}
      >
        <div
          className="MenuMobile__header"
          onClick={() => this._setDisplayMenu()}
        >
          <div className="MenuMobile__header__img">
            <img src={"/images/logo/" + i18n.language + "/logo_centre_violet.png"} alt="logo" className={"teams_logo"}/>
          </div>

          <div className="MenuMobile__header__seperator"></div>
        </div>

        {this.state.displayMenu && (
          <div className="MenuMobile__items px-4">
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
                  className={`py-2 d-flex align-items-center menu${item.id_page}`}
                  onClick={() => this._setDisplayMenu()}
                >
                  <div style={itemStyle} className={"ico-menu"}></div>
                  <div className={"title-menu"}>{item.nom}</div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          </div>
        )}
      </div>
    );
  }
}

export default MenuMobile;
