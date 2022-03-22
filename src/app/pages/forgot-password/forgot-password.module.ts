import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ForgotPasswordRoutingModule} from "./forgot-password-routing.module";
import {ForgotPasswordComponent} from "./forgot-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ],
    declarations: [
        ForgotPasswordComponent
    ]
})
export class ForgotPasswordModule {
}
