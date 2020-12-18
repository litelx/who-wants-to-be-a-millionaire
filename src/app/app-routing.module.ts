import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserComponent } from './components/user/user/user.component';


const routes: Routes = [
    {
        path: '',
        component: UserAddComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
