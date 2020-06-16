import { Reducer } from "react";
import { IQuizzState } from "../../models/Question";

import initialState from "../initialState";

export const questionReducer: Reducer<IQuizzState, any> = (
    state: IQuizzState = initialState.quizz,
    action: any
): IQuizzState => {
    let nextState: IQuizzState;
    switch (action.type) {
        case 'SET_LIST_QUESTION':
            nextState = {
                ...state,
                listQuestion: action.value
            }
            return nextState || state
        case 'SET_MODULE_NIVEAU':
            nextState = {
                ...state,
                selectedModule: action.value.module,
                selectedNiveau: action.value.niveau
            }
            return nextState || state
        case 'SET_PAUSE_QUIZZ':
            nextState = {
                ...state,
                hasAlreadyPaused: action.value,
            }
            return nextState || state
        default:
            return state;
    }
};