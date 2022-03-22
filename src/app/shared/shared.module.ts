import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

// COMPONENTS
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VerticalMenuComponent } from './sidebar/vertical-menu/vertical-menu.component';
import { CustomizerComponent } from './customizer/customizer.component';
import {AuthService} from './auth/auth.service';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        VerticalMenuComponent,
        CustomizerComponent,
        NgbModule,
        TranslateModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        TranslateModule,
        FormsModule,
        OverlayModule,
        ReactiveFormsModule ,
        PerfectScrollbarModule,
        ClickOutsideModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        VerticalMenuComponent,
        CustomizerComponent,
    ],
    providers:[AuthService]
})
export class SharedModule { }
