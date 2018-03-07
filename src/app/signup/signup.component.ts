import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  rForm: FormGroup;
  email: string;
  password: string;
  confirmPassword: string;
  loginPage:any=false;
  forgotPage:any=true;
  registerPage:any=true;
  error;
  loader=true;

  constructor(private router:Router,public authService: AuthService,private fb: FormBuilder) {
    this.rForm = fb.group({
      'email' : [null, Validators.email],
      'password' : [null, Validators.required],
      'validate' : ''
    });   
   }

  ngOnInit() {
  }

  signup(){
    this.startLoader();
   
    this.authService.register(this.rForm.value.email, this.rForm.value.password).subscribe(authData => {
        this.router.navigateByUrl('/profile');
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


loadError(message) {
  this.loader=true;
  this.error=message; 
}


hideError(){
  this.error=null;
}

}
