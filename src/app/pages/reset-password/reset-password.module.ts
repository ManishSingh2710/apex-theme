import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";
import {ResetPasswordComponent} from "./reset-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ],
    declarations: [
        ResetPasswordComponent
    ]
})
export class ResetPasswordModule {
}
