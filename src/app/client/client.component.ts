import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  adressPage: any = true;
  bookingPage: any = true;
  modal_opened: boolean = true;
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

  search: any = {
    searchFname: '',
    searchLname: '',
    searchEmail: ''
  };
  addresses: any = [];
  is_readonly: boolean = true;
  error;
  // emails = ['saobikram@gmail.com', 'brahmi@gmail.com', 'abhi@gmail.com'];
  datas:any = [
    { email: "saobikram@gmail.com", fname: 'Bikram', mname:'', mobile: '1234567890', lname: 'Sao',dob:'1992-05-18',gender:'male',reward:'1000' },
    { email: "brahmi@gmail.com", fname: 'Brahmi',mname:'', mobile: '9876543211', lname: 'Devi',dob:'1994-07-25' ,gender:'female',reward:'2000'},
    { email: "abhi@gmail.com", fname: 'Abhi', mname:'kumar', mobile: '1234123412', lname: 'Behera',dob:'1991-04-01' ,gender:'male',reward:'500'}
  ];

  // signupForm: FormGroup;
  constructor(private router: Router,private elementRef: ElementRef , private fb: FormBuilder) {
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
    // this.search = {
    //   searchFname: '',
    //   searchLname: '',
    //   searchEmail: ''
    // };

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
    this.search = fb.group({
      'searchFname': [null],
      'searchLname': [null],
      'searchEmail': [null]
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

  ngOnInit() {
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
  findfname(fname,lname){
    // alert(fname);
    // alert(lname);
    let count = 0;
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].fname == fname && this.datas[i].lname == lname) {

        alert(this.datas[i].email);
        // this.loadProfilefromdata(this.datas[i].email,this.datas[i].fname,this.datas[i].mname, this.datas[i].mobile, this.datas[i].lname,this.datas[i].dob,this.datas[i].gender);
        count++;
        break;
      }

    }
    if (count == 0) {
      alert('not found');
    }
  }

  findEmailfromdata(email) {
    //alert(this.datas.length);
    let count = 0;
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].email == email) {

        // alert(email);
        this.loadProfilefromdata(this.datas[i].email,this.datas[i].fname,this.datas[i].mname, this.datas[i].mobile, this.datas[i].lname,this.datas[i].dob,this.datas[i].gender,this.datas[i].reward);
        count++;
        break;
        // return email;

      }

    }
    if (count == 0) {
      alert('not found');
    }
  }
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

}
