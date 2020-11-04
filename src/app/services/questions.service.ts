import { Injectable } from '@angular/core';
import questionsList from '../../data/question';
import { TAnswer, TQuestion } from '../models/questions.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    private questions: TQuestion[] = questionsList;
    private question: TQuestion;
    private answer: TAnswer;
    private counter: number = 0;
    constructor() { 
    }

    private getQuestionsList() {
        return this.questions;
    }

    public getCurrentQuestion(): TQuestion {
        const question = this.getQuestionsList()[this.counter];
        this.question = question;

        this.answer = question.answers.find(a => {
            if (a.t) return a;
        });
        const answers = question.answers.filter(a => {
            if (a.f) return a;
        });
        answers.push({f: this.answer.t});
        question.answers = answers;
        return question;
    }

    public getNextQuestion() {
        this.counter++;
    }

    public checkAnswer(answer: TAnswer): boolean {
        return this.answer.t === answer.f;
    }
}
