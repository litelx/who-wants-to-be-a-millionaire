import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './questionaire.reducer';

export const getElementsState = createFeatureSelector<fromReducer.IQuestionaireState>(fromReducer.questionaireFeatureKey);

export const getState = createSelector(getElementsState, (state: fromReducer.IQuestionaireState) => {
    return state
});

export const getQuestions = createSelector(getElementsState,
    (state: fromReducer.IQuestionaireState) => {
        return state.questionsList;
    });

export const getCurrentQuestion = createSelector(getElementsState,
    (state: fromReducer.IQuestionaireState) => {
        return state.questionsList[state.questionaireProgressPosition];
    });

export const getAvailableSkips = createSelector(getElementsState,
    (state: fromReducer.IQuestionaireState) => {
        return state.availableSkips;
    });

export const getUser = createSelector(getElementsState,
    (state: fromReducer.IQuestionaireState) => {
        return state.username;
    });

export const getQuestionaireProgressPosition = createSelector(getElementsState,
    (state: fromReducer.IQuestionaireState) => {
        return state.questionaireProgressPosition;
    });

export const getLeaderBoard = createSelector(getElementsState,
    (state: fromReducer.IQuestionaireState) => {
        return state.leaderBoard;
    });

export const getScore = createSelector(getElementsState,
    (state: fromReducer.IQuestionaireState) => {
        return state.score;
    });
