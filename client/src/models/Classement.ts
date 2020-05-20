import { IUser } from "./User";

export interface IClassement extends IUser {
    rang: number;
}

export interface IClassementState {
    currentView: string;
    viewMonde: boolean;
    listUser?: IClassement[];
    classementCurrentUser?: IClassement;
}
