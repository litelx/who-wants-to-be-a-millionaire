import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public addUserForm: FormGroup;
    public user: User;

    constructor(private formBuilder: FormBuilder,
        private userService: UserService) {
        this.addUserForm = this.formBuilder.group({
            id: ['', [Validators.required, Validators.pattern('^[\\w\\d]+$')]],
            email: [],
            password: [],
            firstName: ['', [Validators.required, Validators.pattern('^[\\w]+$')]],
            lastName: ['', [Validators.required, Validators.pattern('^[\\w]+$')]],
            address: []
        });
    }

    ngOnInit(): void {
    }

    addUser() {
        if (this.addUserForm.valid) {
            console.log(this.addUserForm.value);
            this.userService.addUser(this.addUserForm.value)
        }
    }

    get id() {
        return this.addUserForm.get('id');
    }

    get email() {
        return this.addUserForm.get('email');
    }

    get password() {
        return this.addUserForm.get('password');
    }

    get firstName() {
        return this.addUserForm.get('firstName');
    }

    get lastName() {
        return this.addUserForm.get('lastName');
    }

    get address() {
        return this.addUserForm.get('address');
    }
}
