import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  rForm: FormGroup;
  email: string;
  password: string;
  confirmPassword: string;
  loginPage:any=false;
  forgotPage:any=true;
  registerPage:any=true;
  loader:boolean=true;
  error:string;

  constructor(private router:Router,public authService: AuthService,private fb: FormBuilder) { 
    this.rForm = fb.group({
      'email' : [null, Validators.email],
      'password' : [null, Validators.required],
      'validate' : ''
    });
  }

  ngOnInit() {
  }

  forgotPassword() {
   
      this.startLoader();
    this.authService.resetPassword(this.rForm.value.email).then(res => {
        this.router.navigateByUrl('');
    }).catch(err => {
      this.loadError(err.message);
    });
  

}


goToLogin(){
  this.router.navigateByUrl('/login');
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

loadError(message) {
  this.loader=true;
  this.error=message;
  
}

hideError(){
  this.error=null;
}

}
