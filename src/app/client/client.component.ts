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
  result: any = [];
  booking_result: any = [];
  bookingkey: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  adressPage: any = true;
  bookingPage: any = true;
  modal_opened: boolean = true;
  modal1_opened: boolean = true;
  bookings: any = [];
  updatePage: any = true;
  updateBooking: any = true;
  userTable: any = true;
  bookingTable: any = true;
  updateUser: any = {
    userKey: '',
    UserFName: '',

    UserLName: '',
    Useremail: '',
    gender: '',
    mobile: ''

  };
  updateBookingData: any = {
    booking: '',
    customername: '',

    date: '',
    time: '',
    note: '',
    stage: ''

  };


  // booking: any = {
  //   b_id: '',
  //   service: '',
  //   expertise: '',
  //   price: '',
  //   b_address: '',
  //   date: '',
  //   time: '',
  //   note: ''
  // };

  searchByName: any = {
    searchFname: '',
    searchLname: ''

  };

  searchByEmail: any = {
    email: ''

  };

  searchpartner: any = {
    partnerfDate: '',
    partnertDate: ''
  };

  addresses: any = [];
  loader = true;
  is_readonly: boolean = true;
  error;
  bookings_arr: any = {};
  constructor(private router: Router, private elementRef: ElementRef, private fb: FormBuilder, private productService: ProductService, public db: AngularFireDatabase) {


    // this.booking = {
    //   b_id: '',
    //   service: '',
    //   expertise: '',
    //   price: '',
    //   b_address: '',
    //   date: '',
    //   time: '',
    //   note: ''
    // };


    this.updateUser = {
      userKey: '',
      UserFName: '',

      UserLName: '',
      Useremail: '',
      gender: '',
      mobile: ''

    };
    this.updateUser = fb.group({
      'userKey': [null],
      'UserFName': [null],

      'UserLName': [null],
      'Useremail': [null],
      'gender': [null],
      'mobile': [null]

    });



    this.updateBookingData = {
      booking: '',
      customername: '',

      date: '',
      time: '',
      note: '',
      stage: ''

    };
    this.updateBookingData = fb.group({
      'booking': [null],
      'customername': [null],

      'date': [null],
      'time': [null],
      'note': [null],
      'stage': [null]

    });

    let mobileRegEx = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; //  regular expression for us number
    let nameRegEx = /^[a-zA-Z ]{2,30}$/;

    let stateCodeRegex = /^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/;
    let cityCodeRegex = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    // let zipCodeRegex = /(^\d{6}$)|(^\d{5}-\d{4}$)/;
    let zipCodeRegex = /^\d+$/;
    let addressRegEx = /^[A-Za-z ]{2,30}$/;

    this.searchByName = fb.group({
      'searchFname': [null],
      'searchLname': [null],
    });
    this.searchByEmail = fb.group({
      'email': [null]
    });
    this.searchpartner = fb.group({
      'partnerfDate': [null],
      'partnertDate': [null]
    });

    // this.booking = fb.group({
    //   'b_id': [null],
    //   'service': [null],
    //   'expertise':[null] ,
    //   'price': [null],
    //   'b_address': [null],
    //   'date': [null],
    //   'time': [null],
    //   'note': [null]
    // });


  }

  ngOnInit() {

    this.productService.readUsers()
      .subscribe(users => {
        this.users = users['customer'];

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



  hideAddressModal() {
    this.adressPage = !this.adressPage;
    this.modal_opened = !this.modal_opened;
  }

  // showBooking() {
  //   this.booking.b_id = null;
  //   this.booking.service = "";
  //   this.booking.expertise = "";
  //   this.booking.price = "";
  //   this.booking.b_address = "";
  //   this.booking.date = "";
  //   this.booking.time = "";
  //   this.booking.note = "";
  //   this.bookingPage = !this.bookingPage;
  //   this.modal_opened = !this.modal_opened;
  // }


  hideBookingModal() {
    this.bookingPage = !this.bookingPage;
    this.modal1_opened = !this.modal1_opened;
  }
  hideError() {
    this.error = null;
  }

  makeEditable() {
    this.is_readonly = false;
    // this.is_readonly = !this.is_readonly
  }


  loadProfilefromdata(email, fname, mname, mobile, lname, dob, gender, reward) {
    console.log(dob);
    console.log(gender);


  }

  showUpdateModal(user, fname, lname, email, gender, mobile) {
    this.updatePage = !this.updatePage;
    this.modal_opened = !this.modal_opened;
    // alert(user+fname+mname+lname+email+gender+mobile);
    this.updateUser.setValue({
      'userKey': user,
      'UserFName': fname,

      'UserLName': lname,
      'Useremail': email,
      'gender': gender,
      'mobile': mobile
    });
  }
  hideUpdateModal() {
    this.updatePage = !this.updatePage;
    this.modal_opened = !this.modal_opened;
  }

  updateUserInfo(updateUser) {

    updateUser = this.updateUser.value;

    var json = {
      partnerFirstName: updateUser.UserFName,

      partnerLastName: updateUser.UserLName,
      partnerGender: updateUser.gender,
      partnerEmail: updateUser.Useremail,
      partnerPhone: updateUser.mobile
    };

    console.log(json);
    this.db.list('/customer').update(updateUser.userKey, json);

    this.hideUpdateModal();
    this.hideTable();
    alert("Updated Successfully");

  }
  hideTable() {
    this.userTable = !this.userTable;
  }
  searchByDate(fdate, tdate): void {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.searchByName.setValue({
      searchFname:'',
      searchLname:''
    });
    this.searchByEmail.setValue({
      email:''
    });
    
    this.productService.readUserByDate(fdate, tdate)
      .subscribe(users => {
        this.users = users['customer'];
        //console.log(this.users);
        this.items = Object.values(this.users);
        this.customerKey = Object.keys(this.users);
        $('#DataTables').DataTable().destroy();
        this.dtTrigger.next();
      });
    this.userTable = false;
    this.bookingTable = true;
  }
  searchName(fname, lname): void {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.searchpartner.setValue({
      partnerfDate:'',
      partnertDate:''
    });
    this.searchByEmail.setValue({
      email:''
    });
    this.productService.readUserByName(fname, lname)
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
    this.userTable = false;
    this.bookingTable = true;

  }
  searchEmail(email): void {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.searchpartner.setValue({
      partnerfDate:'',
      partnertDate:''
    });
    this.searchByName.setValue({
      searchFname:'',
      searchLname:''
    });
    this.productService.readUserByEmail(email)
      .subscribe(users => {
        this.users = users['customer'];

        this.items = Object.values(this.users);
        this.customerKey = Object.keys(this.users);
        $('#DataTables').DataTable().destroy();
        this.dtTrigger.next();
      });
    this.userTable = false;
    this.bookingTable = true;

  }
  findbooking(key, uid) {
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
  showUpdateBookingModal(booking, customerName, date, time, notes, serviceName, stage, totalAmount) {
    this.updateBooking = !this.updateBooking;
    this.modal_opened = !this.modal_opened;
    this.updateBookingData.setValue({
      'booking': booking,
      'customername': customerName,

      'date': date,
      'time': time,
      'note': notes,
      'stage': stage
    });
  }
  hideUpdateBookingModal() {
    this.updateBooking = !this.updateBooking;
    this.modal_opened = !this.modal_opened;
  }
  updateBookingInfo(updateBookingData) {

    updateBookingData = this.updateBookingData.value;
    //console.log(updateBookingData);
    var json = {
      customerName: updateBookingData.customername,

      dates: updateBookingData.date,
      times: updateBookingData.time,
      notes: updateBookingData.note,
      stage: updateBookingData.stage
    };

    //console.log(json);
    this.db.list('/booking').update(updateBookingData.booking, json);

    this.hideBookingModal();

  }



}
