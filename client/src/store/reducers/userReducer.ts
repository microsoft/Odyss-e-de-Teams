import { Reducer } from "react";
import { IUserState } from "../../models/User";

import initialState from "../initialState";

export const userReducer: Reducer<IUserState, any> = (
    state: IUserState = initialState.user,
    action: any
): IUserState => {
    let nextState: IUserState;
    switch (action.type) {
        case 'SET_CURRENT_USER':
            nextState = {
                ...state,
                currentUser: action.value
            }
            return nextState || state
        default:
            return state;
    }
};