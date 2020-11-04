import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public username: string = '';
    constructor() { }

    ngOnInit() {
    }

    public login(username: string) {
        console.log('login', username);
    }

}
