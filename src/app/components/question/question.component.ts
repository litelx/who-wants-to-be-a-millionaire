import { Component, OnInit } from '@angular/core';
import { TAnswer, TQuestion } from '../../models/questions.model';
import { QuestionsService } from '../../services/questions.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
    public questionItem: TQuestion;
    public ttt;
    constructor(private questionsService: QuestionsService) { }

    ngOnInit() {
        this.getQuestion();
    }

    public getQuestion() {
        this.questionItem = this.questionsService.getCurrentQuestion();
    }
    
    public setQuestion() {
        
    }
    
    public checkAnswer(answer: TAnswer) {
        const isAnswer = this.questionsService.checkAnswer(answer);
    }

    public skip() {
        this.questionsService.getNextQuestion();
        this.questionItem = this.questionsService.getCurrentQuestion();
    }

}
