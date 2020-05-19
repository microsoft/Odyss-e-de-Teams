import IStore from "./IStore";

export const initialState: IStore = {
  question: {
    isLoading: false,
    listQuestion: [],
  },
  user: {
    currentUser: null,
  },
  avatars: {
    isLoading: false,
    listAvatars: [],
  },
};

export default initialState;
