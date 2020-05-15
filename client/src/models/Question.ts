export interface IQuestion {
    id_question: number;
    nom: string;
}

export interface IQuestionState {
    isLoading: boolean;
    listQuestion?: IQuestion[];
}
