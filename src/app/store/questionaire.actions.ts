import { createAction, props } from '@ngrx/store';
import { TQuestionaireItem, TUser } from '../models/questionaire.model';

// actions types
export const UpdateAvailableSkips = createAction(
    'Update Available Skips'
);
export const UpdateNextStep = createAction(
    'Update Next Step'
);
export const UpdateScore = createAction(
    'Update Score'
);
export const AddLeaderBoard = createAction(
    'Add Leaderboard',
);
export const InitGame = createAction(
    'Init Game',
);
export const SetQuestionAction = createAction(
    'Set Question',
    props<{ questionsList: TQuestionaireItem[] }>()
);
export const AddUser = createAction(
    'Add User',
    props<{ username: TUser }>()
);
export const AddWrongStep = createAction(
    'Add Wrong Step',
    props<{ wrong_steps: TQuestionaireItem }>()
);
export const AddCorrectStep = createAction(
    'Add Correct Step',
    props<{ correct_steps: TQuestionaireItem }>()
);
