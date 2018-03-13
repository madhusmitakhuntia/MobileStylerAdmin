import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemopartnerComponent } from './demopartner/demopartner.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ClientComponent } from './client/client.component';
ClientComponent

const routes: Routes = [
    {
        path: '',
        redirectTo: '/adminlogin',
        pathMatch: 'full'
    },
   {
        path: 'adminhome',
        component: AdminhomeComponent,
        children: [
            {
                path: 'demopartner',
                component:DemopartnerComponent 
            },
            {
                path: 'client',
                component:ClientComponent 
            },
           
        ]
   },
   {
    path: 'adminlogin',
    component:AdminloginComponent 
   }


];

export const routing = RouterModule.forRoot(routes);