import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';

import { TQuestionaireItem } from '../../models/questionaire.model';
import { QuestionsService } from '../../services/questionaire.service';
import { IQuestionaireState } from '../../store/questionaire.reducer';
import * as selectors from '../../store/questionaire.selector';
import { timerTime } from '../../../data/configs';
import * as actions from '../../store/questionaire.actions';

@Component({
    selector: 'game-presenter',
    templateUrl: './game-presenter.component.html',
    styleUrls: ['./game-presenter.component.scss']
})
export class GamePreserterComponent implements OnInit, OnDestroy {
    public questionaireItem: TQuestionaireItem;
    public questionaireItems: TQuestionaireItem[];
    public timer: number = 0;
    public color: string = 'primary';
    public value: number = (this.timer / timerTime) * 100;
    public state$: Observable<IQuestionaireState>;
    public state: IQuestionaireState;
    public isNextEnable = false;
    private unsibscribe$ = new Subject<void>();

    @ViewChild('stepper') private stepper: MatStepper

    constructor(private questionsService: QuestionsService,
        private router: Router,
        private stateStore: Store<{ questionaire: IQuestionaireState }>) {
        this.state$ = stateStore.select('questionaire');

    }

    ngOnInit() {
        this.state$.subscribe(o => {
            this.state = o;
        })
        this.questionsService.getQuestionsList();
        if (!selectors.getUser) {
            this.router.navigate(['leaderboard']);
        }
        this.setQuestion();
        this.initTime();
        this.startTimer();
    }

    ngOnDestroy(): void {
        this.unsibscribe$.next();
        this.unsibscribe$.complete();
    }

    public setQuestion() {
        this.stateStore.select(selectors.getQuestions)
            .pipe(takeUntil(this.unsibscribe$))
            .subscribe(observer => {
                this.questionaireItems = [...observer];
            });
        this.stateStore.select(selectors.getCurrentQuestion)
            .pipe(takeUntil(this.unsibscribe$))
            .subscribe(observer => {
                if (observer) {
                    this.questionaireItem = observer;
                } else {
                    this.gameOver();
                }
            });
    }

    public skip(questionaireStep?: TQuestionaireItem) {
        if (questionaireStep) {
            this.stateStore.dispatch(
                actions.AddWrongStep({
                    wrong_steps: questionaireStep
                }));
        }
        let skips;
        this.stateStore.select(selectors.getAvailableSkips)
            .pipe(takeUntil(this.unsibscribe$))
            .subscribe(o => { skips = o });
        if (skips > 0) {
            this.stateStore.dispatch(actions.UpdateAvailableSkips());
            this.initTime();
        } else {
            this.gameOver();
        }
    }

    public chosenAnswer(chosenAnswer: { answer: string, isCorrect: boolean }) {
        this.isNextEnable = true;
        const questionaireStep: TQuestionaireItem = { ...this.questionaireItem, ...{ answers: [chosenAnswer.answer] } }
        if (chosenAnswer.isCorrect) {
            this.stateStore.dispatch(
                actions.AddCorrectStep({
                    correct_steps: questionaireStep
                }));
            this.stateStore.dispatch(actions.UpdateScore());
        } else {
            this.skip(questionaireStep);
        }
    }

    public nextStep() {
        this.stateStore.dispatch(actions.UpdateNextStep());
        this.isNextEnable = !this.isNextEnable;
        this.initTime();
    }

    private gameOver() {
        setTimeout(() => {
            this.stateStore.dispatch(actions.AddLeaderBoard());
            this.router.navigate(['leaderboard']);
        }, 2000)
    }

    public initTime() {
        this.timer = timerTime;
    }

    public decreaseTime() {
        if (this.timer < 1) return;
        this.timer--;
        this.value = (this.timer / timerTime) * 100;
        if (this.timer < 6) {
            this.color = 'warn';
        };
    }

    private startTimer() {
        setTimeout(() => {
            this.decreaseTime();
            if (this.timer < 1) {
                this.color = 'primary';
                if (this.isNextEnable) {
                    this.nextStep();
                    this.stepper.next()
                } else {
                    this.skip();
                    this.stepper.next()
                }
            };
            this.startTimer();
        }, 1000);
    }
}
