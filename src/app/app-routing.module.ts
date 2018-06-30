import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ClientComponent } from './client/client.component';
import { Data1Component } from './data1/data1.component';
import { PartnerComponent } from './partner/partner.component';
import { Graph2Component } from './graph2/graph2.component';


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
                component: Data1Component
            },
          
            {
                path:'partner',
                component:PartnerComponent
            },
            {
                path: 'client',
                component:ClientComponent 
            },
            {
                path: 'calender',
                component:Graph2Component 
            },
           
           
        ]
   },
   {
    path: 'adminlogin',
    component:AdminloginComponent 
   }


];

export const routing = RouterModule.forRoot(routes);