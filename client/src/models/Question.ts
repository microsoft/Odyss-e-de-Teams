import { IUser } from "./User";

export interface IQuestion {
  id_question: number;
  nom: string;
  asset: string;
  id_module: number;
  id_thematique: number;
  id_niveau: number;
  id_mecanique: number;
  listReponse: IReponse[];
  reponse?: number[];
  astuce?: string;
  selectedReponseIds?: number[]
  reponse_saisie?: number[];
  temps_reponse?: number;
  valid?: boolean;
  video_ok?: boolean;
  nb_xp?: number;
  nb_point?: number;
}


export interface IReponse {
  id_reponse: number;
  id_question: number;
  nom: string;
  asset: string;
  selected?: boolean;
}

export interface IModule {
  id_module: number;
  nom: string;
  image: string;
}

export interface INiveau {
  id_niveau: number;
  nom: string;
}

export interface IHistoQuestionnaireComplete {
  id_module: number;
  id_niveau: number;
  nb_reponse_ok: number;
  horodatage: string;
}

export interface IJouerProps {
  dispatch?: any;
}

export interface IJouerState {
  step: number;
  selectedModule?: IModule;
  selectedNiveau?: INiveau;
}

export interface IChoixModuleNiveauProps {
  onSelect: any;
}
export interface IChoixModuleNiveauState {
  listModule?: IModule[];
  listNiveau?: INiveau[];
  listHistoQuestionnaireComplete?: IHistoQuestionnaireComplete[];
}

export interface IIntroLancementQuestionProps {
  selectedModule: IModule;
  selectedNiveau: INiveau;
  onValid: any;
}

export interface IQuizzProps {
  currentUser: IUser;
  dataInitQuizz: any;
}

export interface IQuizzState {
  isLoading: boolean;
  step: number;
  hasReponse: boolean;
  selectedModule?: IModule;
  selectedNiveau?: INiveau;
  listQuestion?: IQuestion[];
}

export interface IQuizzProps {
  currentUser: IUser;
  dataInitQuizz: any;
  dispatch?: any;
}

export interface IRecapQuizzState {
  isLoading: boolean;
  currentModule?: IModule;
  currentNiveau?: INiveau;
  listQuestion?: IQuestion[];
  tempsTotal?: number;
  nbXpTotal?: number;
  nbPointTotal?: number;
}

export interface IStopWatchProps {
  done?: boolean;
  initTimer?: number;
}

export interface IStopWatchState {
  timerOn: boolean;
  timerStart: number;
  timerTime: number;
}

export interface IMecaniqueQuestionProps {
  question: IQuestion;
  onSelect?: any;
  isRecap?: boolean;
}

export interface IQCMProps extends IMecaniqueQuestionProps {
  multiple?: boolean;
}

export interface IQCMVideoProps extends IQCMProps {
  onPlay?: any;
  onPause?: any;
}

export interface IMecaniqueQuestionState {
  selectedReponseIds: number[];
}

export interface IRemettreOrdreState {
  listReponseWithOrdre: any[];
}