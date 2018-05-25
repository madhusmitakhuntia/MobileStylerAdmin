import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  rForm: FormGroup;
  error:string;
  loader=true;
    email: string;
    password: string;
    demodata={demomail:"admin@gmail.com",demopass:"admin"};
  constructor(private router:Router,private fb: FormBuilder) { 
    this.rForm = fb.group({
      'email' : [null, Validators.email],
      'password' : [null, Validators.required],
    });

   
  }

  ngOnInit() {
  }

  hideError(){
    this.error=null;
  }

  login(email,password){
    /* method calling to start progress bar */
    // alert(password1);
    // alert(email1);
 
    if(this.demodata.demomail==email && this.demodata.demopass==password)
    {
      //alert("success");
      this.router.navigateByUrl('/adminhome');
    }
    else{
      alert("fail");
    }
    
  }

}
