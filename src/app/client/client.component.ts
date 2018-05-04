import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
declare var $: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ProductService]
})
export class ClientComponent implements OnInit {
  products: any = {};
  items: any = [];
  users: any = {};
  userkey: any = [];
  customerKey: any = [];
  result:any=[];
  booking_result: any = [];
  bookingkey: any = [];
 dtOptions: DataTables.Settings = {}; 
 dtTrigger: Subject<any> = new Subject();
  adressPage: any = true;
  bookingPage: any = true;
  modal_opened: boolean = true;
  bookings:any = [];
  updatePage: any = true;
  userTable:any = true;
  bookingTable: any = true;
  updateUser: any = {
    userKey:'',
    UserFName:'',
   
    UserLName: '',
    email: '',
    gender: '',
    mobile:''

  };
  model: any = {
    partnerFName: '',
    partnerMName: '',
    partnerLName: '',
    partnerGender: 'male',
    partnerDob: '',
    partnerEmail: '',
    partnerPhone: '',
    rewardpoint:''
  };
  address: any = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state: ''
  };
  booking: any = {
    b_id: '',
    service: '',
    expertise: '',
    price: '',
    b_address: '',
    date: '',
    time: '',
    note: ''
  };

  searchByName: any = {
    searchFname: '',
    searchLname: ''
   
  };
  searchByEmail: any = {
    email: ''   
   
  };
  addresses: any = [];
  loader=true;
  is_readonly: boolean = true;
  error;
  bookings_arr: any = {};
  constructor(private router: Router,private elementRef: ElementRef , private fb: FormBuilder,private productService: ProductService,public db: AngularFireDatabase) {
    this.model = {
      partnerFName: '',
      partnerMName: '',
      partnerLName: '',
      partnerDob: '',
      partnerGender: 'male',
      partnerEmail: '',
      partnerPhone: '',
      rewardpoint:''

    };
    this.address = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      state: ''
    };
    this.booking = {
      b_id: '',
      service: '',
      expertise: '',
      price: '',
      b_address: '',
      date: '',
      time: '',
      note: ''
    };
   

    this.updateUser = {
      userKey:'',
      UserFName:'',
  
      UserLName: '',
      email: '',
      gender: '',
      mobile:''
  
    };
    this.updateUser =fb.group( {
      'userKey':[null],
      'UserFName':[null],
      
      'UserLName':[null],
      'email': [null],
      'gender':[null],
      'mobile':[null]
  
    });

    let mobileRegEx = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; //  regular expression for us number
    let nameRegEx = /^[a-zA-Z ]{2,30}$/;
    this.model = fb.group({
      'partnerFName': [null, Validators.pattern(nameRegEx)],
      'partnerMName': [null, Validators.pattern(nameRegEx)],
      'partnerLName': [null, Validators.pattern(nameRegEx)],
      'partnerGender': [null, Validators.required],
      'partnerEmail': [null, Validators.email],
      'partnerDob': [null, Validators.email],
      'partnerPhone': [null, Validators.pattern(mobileRegEx)],
      'rewardpoint':[null]
    });

    let stateCodeRegex = /^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/;
    let cityCodeRegex = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    // let zipCodeRegex = /(^\d{6}$)|(^\d{5}-\d{4}$)/;
    let zipCodeRegex = /^\d+$/;
    let addressRegEx = /^[A-Za-z ]{2,30}$/;
    this.address = fb.group({
      'name': [null, Validators.pattern(nameRegEx)],
      'address1': [null, Validators.required],
      'address2': [null],
      'city': [null, Validators.required, Validators.pattern(cityCodeRegex)],
      'state': [null, Validators.required],
      'zip': [null, Validators.pattern(zipCodeRegex)]
    });
    this.searchByName= fb.group({
      'searchFname': [null],
      'searchLname': [null],
     });
    this.searchByEmail = fb.group({
       'email': [null]
    });

    this.booking = fb.group({
      'b_id': [null],
      'service': [null],
      'expertise':[null] ,
      'price': [null],
      'b_address': [null],
      'date': [null],
      'time': [null],
      'note': [null]
    });
 

  }

  ngOnInit()   {
   
    this.productService.readUsers()
      .subscribe(users => {
        this.users = users['customer'];
        //console.log(products);
        //console.log(products.products);
        // console.log(Object.keys(products.products)[0]);
        // console.log((Object.values(products.products)[2].pname);
        //console.log((Object.values(products.products)[2]));
        // this.dtTrigger.next();
         //console.log(this.users);
        // console.log((Object.values(this.users)));
        // console.log(Object.values(this.users).length);
        this.items = Object.values(this.users);

        // console.log(this.items);
         this.userkey = Object.keys(this.users);

      });
      this.productService.readBookings()
      .subscribe(bookings => {
        this.bookings = bookings['bookings'];
      
        this.bookings_arr = Object.values(this.bookings);
       

        console.log(this.bookings_arr);
        
        this.bookingkey = Object.keys(this.bookings);
      })

  }


  showAddress() {
    this.address.index = null;
    this.address.name = "";
    this.address.address1 = "";
    this.address.address2 = "";
    this.address.city = "";
    this.address.state = "";
    this.address.zip = "";
    this.adressPage = !this.adressPage;
    this.modal_opened = !this.modal_opened;
  }

  hideAddressModal() {
    this.adressPage = !this.adressPage;
    this.modal_opened = !this.modal_opened;
  }

  showBooking() {
    this.booking.b_id = null;
    this.booking.service = "";
    this.booking.expertise = "";
    this.booking.price = "";
    this.booking.b_address = "";
    this.booking.date = "";
    this.booking.time = "";
    this.booking.note = "";
    this.bookingPage = !this.bookingPage;
    this.modal_opened = !this.modal_opened;
  }


  hideBookingModal() {
    this.bookingPage = !this.bookingPage;
    this.modal_opened = !this.modal_opened;
  }
  hideError() {
    this.error = null;
  }

  makeEditable() {
    this.is_readonly = false;
    // this.is_readonly = !this.is_readonly
  }
  // findfname(fname,lname){
  //   // alert(fname);
  //   // alert(lname);
  //   let count = 0;
  //   for (let i = 0; i < this.datas.length; i++) {
  //     if (this.datas[i].fname == fname && this.datas[i].lname == lname) {

  //       alert(this.datas[i].email);
  //       // this.loadProfilefromdata(this.datas[i].email,this.datas[i].fname,this.datas[i].mname, this.datas[i].mobile, this.datas[i].lname,this.datas[i].dob,this.datas[i].gender);
  //       count++;
  //       break;
  //     }

  //   }
  //   if (count == 0) {
  //     alert('not found');
  //   }
  // }

  // findEmailfromdata(email,fname,lname) {
  //   //console.log(this.items);
  //  // alert(email);
  //   let count = 0;
  //   this.result=[];
  //   for(let user of this.userkey)
  //   {
  //     if (this.users[user].partnerEmail == email || this.users[user].partnerFirstName==fname && this.users[user].partnerLastName==lname) {

  //       console.log(this.users[user].partnerEmail);
  //       this.result.push(user);
  //       console.log(this.result);
  //       count++;

  //     }


  //   }
  //   this.userTable=false;
   
  //   if (count == 0) {
  //     alert('not found');
  //   }
  // }

  loadProfilefromdata(email,fname,mname,mobile,lname,dob,gender,reward) {
    console.log(dob);
    console.log(gender);

    this.model.setValue({
      'partnerEmail': email,
      'partnerFName': fname,
      'partnerMName': mname,
      'partnerLName': lname,
      'partnerGender': gender,
      'partnerDob':dob,
      'partnerPhone': mobile,
      'rewardpoint':reward

    })
  }

  showUpdateModal(user,fname,lname,email,gender,mobile)  {
    this.updatePage = !this.updatePage;
    this.modal_opened = !this.modal_opened;
    // alert(user+fname+mname+lname+email+gender+mobile);
    this.updateUser.setValue({
  'userKey':user,
  'UserFName':fname,
  
  'UserLName':lname,
  'email': email,
  'gender':gender,
  'mobile':mobile

     });
  }
  hideUpdateModal() {
    this.updatePage = !this.updatePage;
    this.modal_opened = !this.modal_opened;
  }

  updateUserInfo(updateUser){
    //alert(this.updateUser.userKey);
    //let data = this.updateUser.value;
    updateUser=this.updateUser.value;
   //console.log(updateUser);
   //alert(updateUser.UserFName);
   var json={
    partnerFirstName:updateUser.UserFName,
   
    partnerLastName:updateUser.UserLName,
    partnerGender:updateUser.gender,
    partnerEmail:updateUser.email,
    partnerPhone:updateUser.mobile
   };
   //alert(json);
   console.log(json);
   this.db.list('/customer').update(updateUser.userKey,json);

   this.hideUpdateModal() ;
   
  }
  hideTable()
  {
    this.userTable=!this.userTable;
  }
  searchByDate(fdate,tdate): void  {
    this.dtOptions = {
      pagingType: 'full_numbers'
     
    };
   this.productService.readUserByDate(fdate,tdate)
    .subscribe(users => {
      this.users = users['customer'];
      //console.log(this.users);
      this.items = Object.values(this.users);
      this.customerKey = Object.keys(this.users);
        $('#DataTables').DataTable().destroy();
        this.dtTrigger.next();
    });
    this.userTable=false;
    this.bookingTable = true;
  }
  searchName(fname,lname): void  {
    this.dtOptions = {
      pagingType: 'full_numbers'
     
    };
    this.productService.readUserByName(fname,lname)
    .subscribe(users => {
      this.users = users['customer'];
      //console.log(this.users);
    
       this.items = Object.values(this.users);
       //console.log(this.items);
      
       this.customerKey = Object.keys(this.users);
     // console.log( "key"+this.customerKey);
        $('#DataTables').DataTable().destroy();
         this.dtTrigger.next();
    });
    this.userTable=false;
    this.bookingTable = true;
    
  }
  searchEmail(email): void  {
    this.dtOptions = {
      pagingType: 'full_numbers'
     
    };
    this.productService.readUserByEmail(email)
    .subscribe(users => {
      this.users = users['customer'];
    
      this.items = Object.values(this.users);
      this.customerKey = Object.keys(this.users);
        $('#DataTables').DataTable().destroy();
        this.dtTrigger.next();
    });
    this.userTable=false;
    this.bookingTable = true;

  }
  findbooking(key,uid){
    this.booking_result = [];
    for (let booking of this.bookingkey) {
      if (this.bookings[booking].customerId == uid) {

        console.log(this.bookings[booking].customerId);
        this.booking_result.push(booking);
        console.log(this.booking_result);


      }


    }
    this.bookingTable = false;
  }


}
