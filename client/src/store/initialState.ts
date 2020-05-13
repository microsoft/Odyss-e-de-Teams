import IStore from "./IStore";

export const initialState: IStore = {
    question: {
        isLoading: false,
        listQuestion: []
    }
};

export default initialState;
