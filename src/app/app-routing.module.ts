import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePreserterComponent } from './components/game-presenter/game-presenter.component';
import { LeaderboardPresenterComponent } from './components/leaderboard-presenter/leaderboard-presenter.component';
import { LoginComponent } from './components/login/login.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserComponent } from './components/user/user/user.component';


const routes: Routes = [
    {
        path: '',
        component: UserAddComponent
    },
    {
        path: 'game',
        component: GamePreserterComponent
    },
    {
        path: 'scores',
        component: LeaderboardPresenterComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
