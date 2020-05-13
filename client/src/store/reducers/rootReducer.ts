import { combineReducers } from "redux";

import { questionReducer } from "./questionReducer";

import IStore from "../IStore";

const rootReducer = combineReducers<IStore>({
    question: questionReducer
});

export default rootReducer;
