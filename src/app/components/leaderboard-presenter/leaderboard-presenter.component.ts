import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { TLeaderBoard } from '../../models/questionaire.model';
import { IQuestionaireState } from '../../store/questionaire.reducer';
import * as selectors from '../../store/questionaire.selector';

@Component({
    selector: 'app-leaderboard-presenter',
    templateUrl: './leaderboard-presenter.component.html',
    styleUrls: ['./leaderboard-presenter.component.scss']
})
export class LeaderboardPresenterComponent implements OnInit {
    public leaderBoardList: TLeaderBoard[];
    public leaderboard$: Observable<TLeaderBoard[]>

    constructor(private router: Router,
        private stateStore: Store<{ questionaire: IQuestionaireState }>) {
        this.leaderboard$ = stateStore.select(selectors.getLeaderBoard);

    }

    ngOnInit(): void {
        this.leaderboard$
        .pipe(take(1))
        .subscribe(leaderboards => {
            this.leaderBoardList = leaderboards;
        })
    }
    public restartGame() {
        this.router.navigate(['']);
    }
}
