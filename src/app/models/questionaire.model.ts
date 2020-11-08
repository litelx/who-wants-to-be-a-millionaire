export type TQuestion = {
    category: string;
    type: string;
    difficulty: string;
    correct_answer: string;
    question: string;
    incorrect_answers: string[];
}

export type TQuestionaireItem = {
    question: string;
    answers: string[];
}

export type TUser = {
    username: string;
}

export type TLeaderBoard = {
    username: TUser;
    date: number;
    score: number;
}