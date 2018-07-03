import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  searchpartner:any={
    partnerfDate:'',
    partnertDate:''
  };
  result:any=[];
  items: any = [];
  users: any = {};
  userkey: any = [];
// rdate="2018-03-32";
  // datas:any = [
  //   { rdate: "2018-03-01",  pname:'brahmi' },
  //   { rdate: "2018-04-04",  pname:'abhi' },
  //   { rdate: "2018-07-05",  pname:'bikram' }
    
  // ];

  constructor(private router: Router,private fb: FormBuilder,private productService: ProductService) { 

    this. searchpartner={
      partnerfDate:'',
      partnertDate:''
    };

    this.searchpartner = fb.group({
      'partnerfDate': [null],
      'partnertDate': [null]
      
    });
  

    
      if(localStorage.getItem('loaded')===null)
      this.refresh();
    
  }
  refresh(): void {
    localStorage.setItem('loaded','1');
    window.location.reload();
}

  check(){
    // if(localStorage.getItem('uid') === null){
    //   this.router.navigate(['/login']);
    // }
  }
  signOut(): void {
    localStorage.clear();


      this.router.navigateByUrl('');
  }
  search(fdate,tdate){
    alert(fdate);
    this.result=[];
    let count=0;
    for(let user of this.userkey)
    {
      if( moment(new Date(this.users[user].createdAt)).isSameOrAfter(fdate)==true && moment(new Date(this.users[user].createdAt)).isSameOrBefore(tdate) ){
    
    this.result.push(user);
    console.log(this.result);
 

        count++;
       
      }
     
    }
    if(count==0)
    {
      alert('not found');
    }

  }

  hideError(){

  }

  ngOnInit() {
    // this.productService.readUsers()
    // .subscribe(users => {
    //   this.users = users['customer'];
    //   //console.log(products);
    //   //console.log(products.products);
    //   // console.log(Object.keys(products.products)[0]);
    //   // console.log((Object.values(products.products)[2].pname);
    //   //console.log((Object.values(products.products)[2]));
    //   // this.dtTrigger.next();
    //    //console.log(this.users);
    //   // console.log((Object.values(this.users)));
    //   // console.log(Object.values(this.users).length);
    //   this.items = Object.values(this.users);

    //    //console.log(this.items);
    //    this.userkey = Object.keys(this.users);

    // });
  }



}
