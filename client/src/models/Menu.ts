import { IUser, IOrganisation } from "./User";

export interface IMenu {
  id_page: number;
  nom: string;
  router_link: string;
  ordre: number;
  picto: string;
}

export interface IMenuState {
  listMenu: IMenu[];
  selectedMenu?: IMenu;
  organisationLogo: string;
  displayMenu?: boolean;
}

export interface IMenuProps {
  currentRouterLink: string;
  currentUser?: IUser;
  currentOrganisation?: IOrganisation;
}
