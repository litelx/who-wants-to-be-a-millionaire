import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MaterialsModule } from 'src/app/shared/material.module';



@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class LoginModule { }
