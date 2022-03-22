import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [AuthService]
})
export class LoginModule {
}
