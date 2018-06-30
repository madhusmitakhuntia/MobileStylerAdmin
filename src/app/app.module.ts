import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { PartnerComponent } from './partner/partner.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ServicesService } from './services/services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, NoOpMapsAPILoader} from '@agm/core';

import { DataTablesModule } from 'angular-datatables';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ClientComponent } from './client/client.component';



import { HttpModule } from '@angular/http';
import { UpdateprofileService } from './services/updateprofile.service';
import { ProductService } from './services/product.service';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

// import { GraphComponent } from './graph/graph.component';
import { Data1Component } from './data1/data1.component';
import { PartnerService } from './services/partner.service';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Graph2Component } from './graph2/graph2.component';
import { DemoUtilsModule } from '../demo-utils/module';
import { RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { GoogleChartComponent } from './google-chart/google-chart.component';

// AF2 DEV Settings
export const firebaseConfig = {
 
  //mobilestyler-admin
  apiKey: "AIzaSyDYrZQd7VnoKyWYHkdh5aN-sqvooI7jJCQ",
    authDomain: "mobilestyler-admin.firebaseapp.com",
    databaseURL: "https://mobilestyler-admin.firebaseio.com",
    projectId: "mobilestyler-admin",
    storageBucket: "mobilestyler-admin.appspot.com",
    messagingSenderId: "70818185647"
};

@NgModule({
  declarations: [
    AppComponent,
    PartnerComponent,
    AdminloginComponent,
    AdminhomeComponent,
    ClientComponent,
    HomeComponent,
    Data1Component,
    Graph2Component,
    GoogleChartComponent
      ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule, CalendarModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,
    HttpClientModule,
    DemoUtilsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpModule,
    TranslateModule.forRoot(),
    FusionChartsModule,
   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5oKjXY9B9Kwch941wSWD7jRRF4r78TRw',
      libraries: ["places"]
    })
  ],
  providers: [
   
    ServicesService,
   
    ProductService,
    UpdateprofileService,
    PartnerService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
