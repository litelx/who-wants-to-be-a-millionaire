import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    // public username: string = '';
    public username = new FormControl('', [Validators.required, Validators.pattern('^[\w\d]+$')]);

    constructor() { }

    ngOnInit() {
    }

    public login(username: string) {
        console.log('login', username);
    }

}
