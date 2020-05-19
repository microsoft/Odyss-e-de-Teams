import { IUser } from "./User";

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
}

export interface IMenuProps {
    currentRouterLink: string;
    currentUser: IUser;
}
