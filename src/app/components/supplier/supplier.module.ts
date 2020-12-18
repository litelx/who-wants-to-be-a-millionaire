import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';



@NgModule({
    declarations: [
        SupplierComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        SupplierModule
    ]
})
export class SupplierModule { }
