import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';

import { EStatusPage, TQuestionaireItem } from '../../models/questionaire.model';
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
    public timer: { timer: number, color: string, value: number };
    public state$: Observable<IQuestionaireState>;
    public isNextEnable = false;
    public timerRef;
    public page: EStatusPage;
    public pageItem = EStatusPage;
    private unsibscribe$ = new Subject<void>();

    @ViewChild('stepper') private stepper: MatStepper

    constructor(private questionsService: QuestionsService,
        private stateStore: Store<{ questionaire: IQuestionaireState }>) {
        this.state$ = this.stateStore.select(selectors.getState);
    }

    ngOnInit() {
        this.setPage(EStatusPage.Login)
        this.questionsService.getQuestionsList();
        if (!selectors.getUser) {
            this.setPage(EStatusPage.Login)
        }
        this.setQuestion();
        this.createTimer();
    }

    public setPage(page: EStatusPage) {
        this.page = page;
    }

    private createTimer() {
        this.timer = {
            timer: 0,
            color: 'primary',
            value: (0 / timerTime) * 100
        },
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
                if (observer.length) {
                    this.questionaireItems = [...observer];
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
        clearTimeout(this.timerRef)
        this.stateStore.dispatch(actions.AddLeaderBoard());
        this.setPage(EStatusPage.Leaderboard);
    }

    public initTime() {
        this.timer.timer = timerTime;
    }

    public decreaseTime() {
        if (this.timer.timer < 1) return;
        this.timer.timer--;
        this.timer.value = (this.timer.timer / timerTime) * 100;
        if (this.timer.timer < 6) {
            this.timer.color = 'warn';
        };
    }

    private startTimer() {
        this.timerRef = setTimeout(() => {
            this.decreaseTime();
            if (this.timer.timer < 1) {
                this.timer.color = 'primary';
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
