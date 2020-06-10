import { IMedaille } from "./Medaille";

export interface IUser {
  id_user: number;
  nom: string;
  id_avatar: number;
  id_medaille_avatar?: number;
  id_role: number;
  nb_point?: number;
  id_organisation: number;
  nb_questionnaire_complete?: number;
  nb_reponse?: number;
  nb_reponse_consecutive_en_cours?: number;
  nb_reponse_consecutive_top?: number;
  nb_reponse_ok?: number;
  nb_xp?: number;
  nb_medaille?: number;
  niveau: number;
  nom_avatar: string;
  image_avatar: string;
}

export interface IReward {
  type: string;
  value: number;
}

export interface ILevelUp {
  hasLevelUp: boolean;
  level?: number;
  nb_xp?: number;
  rewards?: IReward[]; 
  medaille?: IMedaille;
  nextLevel?: ILevelUp;
}

export interface IUserState {
  currentUser?: IUser;
  dataLevelUp?: ILevelUp;
}

export interface IProfilProps {
  currentUser: IUser;
  dispatch?: any;
}

export interface IProfilState {
  listMedaille: IMedaille[];
  showModalProfil?: boolean;
  classementXP?: number;
  classementPoint?: number;
  dataLevelUp?: ILevelUp;
  selectedMedailleAvatar?: IMedaille;
  hasUpdatedMedailleAvatar?: boolean;
}

export interface IUserAvatarProps {
  user: IUser;
  withoutName?: boolean;
}
