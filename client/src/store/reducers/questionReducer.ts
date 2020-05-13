import { Reducer } from "react";
import { IQuestionState } from "../../models/Question";

import initialState from "../initialState";

export const questionReducer: Reducer<IQuestionState, any> = (
    state: IQuestionState = initialState.question,
    action: any
): IQuestionState => {
    let nextState: IQuestionState;
    switch (action.type) {
        case 'SET_LIST_QUESTION':
            nextState = {
                ...state,
                listQuestion: action.value
            }
            return nextState || state
        default:
            return state;
    }
};