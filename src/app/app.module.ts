import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PaymentsComponent } from './payments/payments.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PartnerComponent } from './partner/partner.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {NotificationsService} from './services/notifications.service';
import {BookingsService} from "./services/bookings.service";
import {ProfileService} from "./services/profile.service";
import {AuthService} from './services/auth.service';
import { ServicesService } from './services/services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, NoOpMapsAPILoader} from '@agm/core';
import { PrivacyComponent } from './privacy/privacy.component';
import { DataTablesModule } from 'angular-datatables';

import { DemopartnerComponent } from './demopartner/demopartner.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ClientComponent } from './client/client.component';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';
import { DataComponent } from './data/data.component';

import { HttpModule } from '@angular/http';
import { UpdateprofileService } from './services/updateprofile.service';
import { ProductService } from './services/product.service';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

// import { GraphComponent } from './graph/graph.component';
import { Data1Component } from './data1/data1.component';
import { GetbookingComponent } from './getbooking/getbooking.component';
import { PartnerService } from './services/partner.service';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

// AF2 DEV Settings
export const firebaseConfig = {
  // apiKey: "AIzaSyCvktdcqYeGv0I0hEixFAtnTjmgwza1npo",
  //   authDomain: "mobile-styler-dev.firebaseapp.com",
  //   databaseURL: "https://mobile-styler-dev.firebaseio.com",
  //   projectId: "mobile-styler-dev",
  //   storageBucket: "mobile-styler-dev.appspot.com",
  //   messagingSenderId: "413615010645"
  //brahmi
  // apiKey: "AIzaSyCRBXOBtdi9PTZHDyhYJB5Riuf3w0WyW4E",
  //   authDomain: "partner-f3f0b.firebaseapp.com",
  //   databaseURL: "https://partner-f3f0b.firebaseio.com",
  //   projectId: "partner-f3f0b",
  //   storageBucket: "partner-f3f0b.appspot.com",
  //   messagingSenderId: "396776753432"
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
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgotComponent,
    ProfileComponent,
    BookingsComponent,
    PaymentsComponent,
    NotificationsComponent,
    PartnerComponent,
    RegisterComponent,
    DetailsComponent,
    PrivacyComponent,
    DemopartnerComponent,
    AdminloginComponent,
    AdminhomeComponent,
    ClientComponent,
    PartnerDetailsComponent,
    DataComponent,
    Data1Component,
    GetbookingComponent
    ],
  imports: [
    BrowserModule,
    routing,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpModule,
    FusionChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5oKjXY9B9Kwch941wSWD7jRRF4r78TRw',
      libraries: ["places"]
    })
  ],
  providers: [
    AuthService,
    NotificationsService,
    BookingsService,
    ServicesService,
    ProfileService,
    ProductService,
    UpdateprofileService,
    PartnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
