import IStore from "./IStore";

export const initialState: IStore = {
  question: {
    isLoading: false,
    listQuestion: [],
    selectedModule: null,
    selectedNiveau: null
  },
  user: {
    currentUser: null,
  },
};

export default initialState;
