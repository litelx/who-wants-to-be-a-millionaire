import * as _ from 'lodash';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionsService } from '../../services/questionaire.service';
import { TQuestionaireItem } from '../../models/questionaire.model';

@Component({
    selector: 'question-presenter',
    templateUrl: './question-presenter.component.html',
    styleUrls: ['./question-presenter.component.scss']
})
export class QuestionPresenterComponent implements OnInit {
    @Input() questionIndex: number;
    @Input() questionaireItem: TQuestionaireItem;
    @Output() chosenAnswer: EventEmitter<{ answer: string, isCorrect: boolean }> = new EventEmitter<{ answer: string, isCorrect: boolean }>();

    public value: string = '';
    public isCorrect: boolean;
    public trueAnswerIndex: number;
    public isCheckedAnswer: boolean = false;
    constructor(private questionsService: QuestionsService) { }

    ngOnInit() {
        this.signAnswers();
    }
    
    private signAnswers() {
        const value = this.questionsService.getAnswerOfQuestionByIndex(this.questionIndex);
        this.trueAnswerIndex = _.findIndex(this.questionaireItem.answers, function (o) { return o == value; });
    }

    public checkAnswer() {
        if (this.value && !this.isCheckedAnswer) {
            this.isCheckedAnswer = true;
            this.isCorrect = this.questionsService.checkAnswer(this.value, this.questionIndex);
            this.chosenAnswer.emit({ answer: this.value, isCorrect: this.isCorrect });
        }
    }
}
