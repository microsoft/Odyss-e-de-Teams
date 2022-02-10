// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import IStore from "./IStore";

export const initialState: IStore = {
  quizz: {
    isLoading: false,
    step: 1,
    hasReponse: false,
    listQuestion: [],
    selectedModule: null,
    selectedNiveau: null,
    hasAlreadyPaused: false
  },
  user: {
    currentUser: null,
    currentOrganisation: null,
    currentCampaign: null,
    dataLevelUp: null,
    listNewMedal: null
  },
};

export default initialState;
