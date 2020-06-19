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
            return nextState || state;
        case 'SET_CURRENT_ORGANISATION':
            nextState = {
                ...state,
                currentOrganisation: action.value
            }
            return nextState || state;
        case 'SET_CURRENT_CAMPAIGN':
            nextState = {
                ...state,
                currentCampaign: action.value
            }
            return nextState || state;
        case 'LEVEL_UP':
            nextState = {
                ...state,
                dataLevelUp: action.value
            }
            return nextState || state;
        case 'NEW_MEDAL':
            nextState = {
                ...state,
                listNewMedal: action.value
            }
            return nextState || state;
        default:
            return state;
    }
};