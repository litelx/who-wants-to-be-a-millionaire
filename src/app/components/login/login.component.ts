import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as actions from '../../store/questionaire.actions';
import { IQuestionaireState } from '../../store/questionaire.reducer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private stateStore: Store<{ questionaire: IQuestionaireState }>,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern('^[\\w\\d]+$')]]
        });
    }

    ngOnInit() {
        this.stateStore.dispatch(actions.InitGame());
    }

    public login() {
        if (this.loginForm.valid) {
            this.stateStore.dispatch(actions.AddUser({ username: this.loginForm.value.username }));
            this.router.navigate(['game']);
        }
    }

    get username() {
        return this.loginForm.get('username');
    }
}
