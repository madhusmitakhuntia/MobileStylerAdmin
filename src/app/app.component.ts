import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';     // Add this
import {LoginComponent} from './login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
}

