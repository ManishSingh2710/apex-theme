import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginModule)

    },
    {
        path: 'forgot-password',
        loadChildren: () => import('../../pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
    },
    {
        path: 'reset-password',
        loadChildren: () => import('../../pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
    },
    {
        path: 'reset-password/:email&:token',
        loadChildren: () => import('../../pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
    }
];
