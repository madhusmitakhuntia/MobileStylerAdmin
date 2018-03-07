import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  error:string;
  loader=true;
    email: string;
    password: string;
    confirmPassword: string;
  constructor(private router:Router,public authService: AuthService,private fb: FormBuilder) { 
    this.rForm = fb.group({
      'email' : [null, Validators.email],
      'password' : [null, Validators.required],
      'validate' : ''
    });

    localStorage.clear();
  }

  ngOnInit() {
  }

  loadError(message) {
    this.loader=true;
    this.error=message; 
  }


  hideError(){
    this.error=null;
  }

  login(){
    /* method calling to start progress bar */
    this.startLoader();
    
     
      this.authService.login(this.rForm.value.email, this.rForm.value.password).then(authData => {
        localStorage.setItem('uid',authData.uid)
        this.router.navigateByUrl('/home');
      }, error => {
          this.loadError(error.message);
      });
    
  }

  startLoader(){
    this.loader=false;
    this.setTimer();
  }

  setTimer()
  {
    setTimeout(()=>{   
      this.loadError('Please check your network and try again')
    },20000);
  }

 

}




