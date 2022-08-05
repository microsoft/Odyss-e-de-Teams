// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IUser } from "./User";

export interface IClassement extends IUser {
  rang: number;
}

export interface IClassementProps {
  currentUser: IUser;
}

export interface IClassementState {
  currentView: string;
  viewMonde: boolean;
  listUser?: IClassement[];
  classementCurrentUser?: IClassement;
  listIndicateur?: any;
}
