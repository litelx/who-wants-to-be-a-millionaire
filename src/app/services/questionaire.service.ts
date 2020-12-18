import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subject } from 'rxjs';

import { TQuestion, TQuestionaireItem } from '../models/questionaire.model';
import * as selectors from '../store/questionaire.selector';
import * as actions from '../store/questionaire.actions';
import { IQuestionaireState } from '../store/questionaire.reducer';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const questionsList = require('../../data/questions.json');

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    private questions: TQuestion[] = questionsList.results;
    private store$: Observable<IQuestionaireState>
    constructor(private httpClient: HttpClient,
        private stateStore: Store<{ questionaire: IQuestionaireState }>) {
        this.store$ = stateStore.select('questionaire');
    }

    public getQuestionsList() {
        const questionsItems = this.convertQuestions();
        this.stateStore.dispatch(actions.SetQuestionAction({ questionsList: questionsItems }));
    }

    private convertQuestions(): TQuestionaireItem[] {
        return this.questions.map((item: TQuestion) => {
            return {
                question: item.question,
                answers: _.shuffle(_.concat(item.incorrect_answers, [item.correct_answer]))
            }
        });
    }

    public getAnswerOfQuestionByIndex(index: number): string {
        return this.questions[index].correct_answer;
    }

    public getCorrectAnswer(): string {
        let answer = '';
        this.stateStore.select(selectors.getQuestionaireProgressPosition)
        .subscribe(position => {
            if (this.questions[position]) {
                answer = this.questions[position].correct_answer;
            }
        })
        return answer;
    }

    public checkAnswer(chosenAnswer: string, index: number): boolean {
        return this.questions[index].correct_answer === chosenAnswer;
    }

    private handleError(err) {
        this.errorMessage = err;
        return EMPTY;
    }

    public pro = new Promise((resolve, reject) => {
        let ques$ = this.qsSubject$.asObservable().pipe();
        this.httpClient.get<IQuestionaireState>(url)
        .subscribe(o => {
            resolve(o)
        })
        
    })

    private qsSubject$ = new Subject<IQuestionaireState>();
    private errorMessage = '';
    qs$ = this.httpClient.get<IQuestionaireState>(url).pipe(
        tap(data => console.log('quest', data)),
        catchError(this.handleError)
    )
}

const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
