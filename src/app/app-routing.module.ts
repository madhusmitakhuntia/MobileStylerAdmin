import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemopartnerComponent } from './demopartner/demopartner.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ClientComponent } from './client/client.component';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';
import { Data1Component } from './data1/data1.component';

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
                path: '',
                component: PartnerDetailsComponent
            },
            {
                path: 'demopartner',
                component:DemopartnerComponent 
            },
            {
                path: 'client',
                component:ClientComponent 
            },
            {
                path: 'graph',
                component:Data1Component 
            }
           
           
        ]
   },
   {
    path: 'adminlogin',
    component:AdminloginComponent 
   }


];

export const routing = RouterModule.forRoot(routes);