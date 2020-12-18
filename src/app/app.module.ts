import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './shared/material.module';
import { reducer } from './store/questionaire.reducer';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './components/user/user.module';
import { LoginModule } from './components/login/login.module';
import { RegisterModule } from './components/register/register.module';
import { SupplierModule } from './components/supplier/supplier.module';
import { ProductModule } from './components/product/product.module';
import { DepartmentModule } from './components/department/department.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        MaterialsModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,

        UserModule,
        LoginModule,
        RegisterModule,
        SupplierModule,
        ProductModule,
        DepartmentModule,

        StoreModule.forRoot({'questionaire': reducer}),
    ],
    exports: [
        HttpClientModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
