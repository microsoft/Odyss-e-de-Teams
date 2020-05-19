import { Reducer } from "react";
import { IAvatarState } from "./../../models/Avatar";

import initialState from "../initialState";

export const avatarReducer: Reducer<IAvatarState, any> = (
  state: IAvatarState = initialState.avatars,
  action: any
): IAvatarState => {
  let nextState: IAvatarState;

  switch (action.type) {
    case "SET_LIST_AVATARS":
      nextState = {
        ...state,
        listAvatars: action.value,
      };

      return nextState || state;
    default:
      return state;
  }
};
