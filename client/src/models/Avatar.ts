export interface IAvatar {
  id_avatar: number;
  nom: string;
  description: string;
  image: string;
  actif: boolean;
}

export interface IAvatarState {
  isLoading: boolean;
  listAvatars?: IAvatar[];
}
