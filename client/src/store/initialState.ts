import IStore from "./IStore";

export const initialState: IStore = {
  quizz: {
    isLoading: false,
    step: 1,
    hasReponse: false,
    listQuestion: [],
    selectedModule: null,
    selectedNiveau: null
  },
  user: {
    currentUser: null,
    dataLevelUp: null
  },
};

export default initialState;
