import { Injectable } from '@angular/core';
import questionsList from '../../data/question';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    private questions = questionsList;
    private counter = 0;
    constructor() { 
    }

    private getQuestionsList() {
        return this.questions;
    }

    public getCurrentQuestion() {
        return this.getQuestionsList()[this.counter];
    }

    public getNextQuestion() {
        this.counter++;
    }
}
