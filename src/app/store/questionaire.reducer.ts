import * as _ from 'lodash';
import { createReducer, on, Action } from '@ngrx/store';
// import { scorePoints, skip } from '../../data/configs';
import { TLeaderBoard, TQuestionaireItem, TUser } from '../models/questionaire.model';
import * as actions from './questionaire.actions';

export const questionaireFeatureKey = 'questionaire';

// State Type
export interface IQuestionaireState {
    questionsList: TQuestionaireItem[];
    wrong_steps: TQuestionaireItem[];
    correct_steps: TQuestionaireItem[];
    score: number;
    availableSkips: number;
    username: TUser;
    questionaireProgressPosition: number;
    leaderBoard: TLeaderBoard[]
}

// Initial state
export const initialState: IQuestionaireState = {
    questionsList: [],
    wrong_steps: [],
    correct_steps: [],
    score: 0,
    availableSkips: 3,
    username: undefined,
    questionaireProgressPosition: 0,
    leaderBoard: []
};

// REDUCER
const questionaireReducers = createReducer(
    initialState,
    on(actions.SetQuestionAction, (state, action) => ({ ...state, questionsList: action.questionsList })),
    on(actions.UpdateNextStep, state => ({ ...state, questionaireProgressPosition: 1 + state.questionaireProgressPosition })),
    on(actions.UpdateScore, state => ({ ...state, score: state.score + 10 })),
    on(actions.InitGame, state => ({ ...initialState, leaderBoard: state.leaderBoard })),
    on(actions.AddUser, (state, action) => {
        return { ...state, username: action.username }
    }),
    on(actions.UpdateAvailableSkips, state => {
        const skips = state.availableSkips - 1
        return { ...state, availableSkips: skips }
    }),
    on(actions.AddCorrectStep, (state, action) => {
        return { ...state, correct_steps: [...state.correct_steps, action.correct_steps] }
    }),
    on(actions.AddWrongStep, (state, action) => {
        return { ...state, wrong_steps: [...state.wrong_steps, action.wrong_steps] }
    }),
    on(actions.AddLeaderBoard, state => {
        const leaderboards: TLeaderBoard[] = _.reverse(_.takeRight(_.sortBy([
            ...state.leaderBoard,
            {
                username: state.username,
                score: state.score,
                date: new Date().getTime()
            }
        ], 'score'), 10));
        return { ...state, leaderBoard: [...leaderboards] }
    }),
);

export function reducer(state: IQuestionaireState | undefined, action: Action) {
    return questionaireReducers(state, action);
};
