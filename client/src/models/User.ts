export interface IUser {
    id_user: number;
    nom: string;
    id_avatar: number;
    id_medaille_avatar?: number;
    id_role: number;
    nb_point?: number;
    nb_questionnaire_complete?: number;
    nb_reponse?: number;
    nb_response_consecutive_en_cours?: number;
    nb_response_consecutive_top?: number;
    nb_response_ok?: number;
    nb_xp?: number;
    niveau: number;
}

export interface IUserState {
    currentUser?: IUser;
}
