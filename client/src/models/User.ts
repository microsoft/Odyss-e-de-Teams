export interface IUser {
    id_user: number;
    nom: string;
    id_avatar: number;
    id_medaille_avatar?: number;
    id_role: number;
    nb_point?: number;
    nb_questionnaire_complete?: number;
    nb_reponse?: number;
    nb_reponse_consecutive_en_cours?: number;
    nb_reponse_consecutive_top?: number;
    nb_reponse_ok?: number;
    nb_xp?: number;
    niveau: number;
    nom_avatar: string;
    image_avatar: string;
}

export interface IUserState {
    currentUser?: IUser;
}

export interface IMedaille {
    id_medaille: number;
    nom: string;
    image: string;
    legendaire: boolean;
    unlock: boolean;
}

export interface IProfilProps {
    currentUser: IUser;
}

export interface IProfilState {
    listMedaille: IMedaille[];
    showModalProfil?: boolean;
}