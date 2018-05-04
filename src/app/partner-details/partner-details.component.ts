import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { ProductService } from '../services/product.service';
import { DataTablesModule} from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
declare var $: any;
//  import * as $ from 'jquery';

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
  items: any = [];
  users: any = {};
  userkey: any = [];
  dtOptions: DataTables.Settings = {}; 
  userTable:any = true;

  
// rdate="2018-03-32";
  // datas:any = [
  //   { rdate: "2018-03-01",  pname:'brahmi' },
  //   { rdate: "2018-04-04",  pname:'abhi' },
  //   { rdate: "2018-07-05",  pname:'bikram' }
    
  // ];

  dtTrigger: Subject<any> = new Subject();
  constructor(private router: Router,private fb: FormBuilder,private productService: ProductService) { 

    this. searchpartner={
      partnerfDate:'',
      partnertDate:''
    };

    this.searchpartner = fb.group({
      'partnerfDate': [null],
      'partnertDate': [null]
      
    });
  

    
        
  }
  search(fdate,tdate): void  {
    this.dtOptions = {
      pagingType: 'full_numbers'
     
    };
    // let count=0;
    this.productService.readUserByDate(fdate,tdate)
    .subscribe(users => {
      this.users = users['customer'];
    
      this.items = Object.values(this.users);

       console.log(this.items);
       $('#DataTables').DataTable().destroy();
       this.dtTrigger.next();
    });
    
 
  
    // this.result=[];
    
    // for(let user of this.userkey)
    // {
    //   if( moment(new Date(this.users[user].createdAt)).isSameOrAfter(fdate)==true && moment(new Date(this.users[user].createdAt)).isSameOrBefore(tdate) ){
        
    // this.result.push(user);
    
 

    //     count++;
       
    //   }
     
    // }
    
    //console.log(this.result);
    this.userTable=false;
    // if(count==0)
    // {
    //       alert("not found");
    // }
   
  }
  ngOnInit() {
   
    
  }
  hideTable()
  {
    this.userTable=!this.userTable;
  }
 
}
