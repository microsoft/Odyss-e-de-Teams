import { combineReducers } from "redux";

import { questionReducer } from "./questionReducer";
import { userReducer } from "./userReducer";
import { avatarReducer } from "./avatarReducer";

import IStore from "../IStore";

const rootReducer = combineReducers<IStore>({
  question: questionReducer,
  user: userReducer,
  avatars: avatarReducer,
});

export default rootReducer;
