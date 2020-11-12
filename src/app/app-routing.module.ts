import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePreserterComponent } from './components/game-presenter/game-presenter.component';


const routes: Routes = [
    {
        path: '',
        component: GamePreserterComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
