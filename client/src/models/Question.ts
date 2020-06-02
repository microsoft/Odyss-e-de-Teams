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
  selectedReponseIds?: number[]
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

export interface IStopWatchState {
  timerOn: boolean;
  timerStart: number;
  timerTime: number;
}

export interface IMecaniqueQuestionProps {
  question: IQuestion;
  onSelect: any;
}

export interface IQCMProps extends IMecaniqueQuestionProps {
  multiple?: boolean;
}

export interface IMecaniqueQuestionState {
  selectedReponseIds: number[];
}

export interface IRemettreOrdreState {
  listReponseWithOrdre: any[];
}