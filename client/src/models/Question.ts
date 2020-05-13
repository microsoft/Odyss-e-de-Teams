export interface Question {
    id_question: number;
    nom: string;
}

export interface IQuestionState {
    isLoading: boolean;
    listQuestion?: Question[];
}
