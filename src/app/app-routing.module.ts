import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';     // Add this
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentsComponent } from './payments/payments.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { ClientComponent } from './client/client.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: DetailsComponent
            },
            {
                path: 'bookings',
                component: BookingsComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'notifications',
                component: NotificationsComponent
            },
            {
                path: 'payments',
                component: PaymentsComponent
            }
            ,
            {
                path: 'client',
                component: ClientComponent
            }
            // ,
            // {
            //     path: 'payments',
            //     component: PaymentsComponent
            // }
            
        ]
    },
    {
        path:'privacy',
        component:PrivacyComponent
    },
    {
        path: 'profile',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'forgot',
        component: ForgotComponent
    }


];

export const routing = RouterModule.forRoot(routes);