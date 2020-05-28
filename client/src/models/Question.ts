import { IUser } from "./User";

export interface IQuestion {
  id_question: number;
  nom: string;
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

export interface IQuestionState {
  isLoading: boolean;
  selectedModule?: IModule;
  selectedNiveau?: INiveau;
  listQuestion?: IQuestion[];
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