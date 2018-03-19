import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {

  searchpartner:any={
    partnerfDate:'',
    partnertDate:''
  };
  result:any=[];
// rdate="2018-03-32";
  datas:any = [
    { rdate: "2018-03-01",  pname:'brahmi' },
    { rdate: "2018-04-04",  pname:'abhi' },
    { rdate: "2018-07-05",  pname:'bikram' }
    
  ];


  constructor(private router: Router,private fb: FormBuilder) { 

    this. searchpartner={
      partnerfDate:'',
      partnertDate:''
    };

    this.searchpartner = fb.group({
      'partnerfDate': [null],
      'partnertDate': [null]
      
    });
  

    
        
  }
  search(fdate,tdate){
    this.result=[];
    let count=0;
    for (let i = 0; i < this.datas.length; i++)
    {
      if( moment(this.datas[i].rdate).isSameOrAfter(fdate)==true && moment(this.datas[i].rdate).isSameOrBefore(tdate) ){
    
    this.result.push(this.datas[i]);
 

        count++;
       
      }
     
    }
    if(count==0)
    {
      alert('not found');
    }

  }
  ngOnInit() {
  }

}
