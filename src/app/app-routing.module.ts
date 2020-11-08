import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePreserterComponent } from './components/game-presenter/game-presenter.component';
import { LeaderboardPresenterComponent } from './components/leaderboard-presenter/leaderboard-presenter.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'game',
        component: GamePreserterComponent
    },
    {
        path: 'leaderboard',
        component: LeaderboardPresenterComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
