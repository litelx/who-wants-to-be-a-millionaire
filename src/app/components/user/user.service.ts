import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    public addUser(user: User) {
        console.log(`adding user service:`, user);
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        this.http.post(`${url}/api/addUser`, user)
        .subscribe(observer => {
            console.log(observer);
            
        });
    }

}
const protocol: string = 'http';
const baseUrl: string = 'localhost';
const port: string = '3000';

const url: string = `${protocol}://${baseUrl}:${port}`;
