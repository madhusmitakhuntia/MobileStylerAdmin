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
  modal_opened: boolean = true;
  model: any = {
    partnerFName: '',
    partnerMName: '',
    partnerLName: '',
    partnerGender: 'male',
    partnerDob: '',
    partnerEmail: '',
    partnerPhone: ''
  };
  address: any = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state: ''
  };

  search: any = {
    searchFname: '',
    searchLname: '',
    searchEmail: ''
  };
  addresses: any = [];
  is_readonly: boolean = true;
  error;
  emails = ['saobikram@gmail.com', 'brahmi@gmail.com', 'abhi@gmail.com'];
  datas:any = [
    { email: "saobikram@gmail.com", fname: 'Bikram', mobile: '1234567890', lname: 'Sao' },
    { email: "brahmi@gmail.com", fname: 'Brahmi', mobile: '9876543211', lname: 'Devi' },
    { email: "abhi@gmail.com", fname: 'Abhi', mobile: '1234123412', lname: 'Behera' }
  ];

  // signupForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.model = {
      partnerFName: '',
      partnerMName: '',
      partnerLName: '',
      partnerDob: '',
      partnerGender: 'male',
      partnerEmail: '',
      partnerPhone: ''

    };
    this.address = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      state: ''
    };
    this.search = {
      searchFname: '',
      searchLname: '',
      searchEmail: ''
    };

    let mobileRegEx = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; //  regular expression for us number
    let nameRegEx = /^[a-zA-Z ]{2,30}$/;
    this.model = fb.group({
      'partnerFName': [null, Validators.pattern(nameRegEx)],
      'partnerMName': [null, Validators.pattern(nameRegEx)],
      'partnerLName': [null, Validators.pattern(nameRegEx)],
      'partnerGender': [null, Validators.required],
      'partnerEmail': [null, Validators.email],
      'partnerDob': [null, Validators.email],
      'partnerPhone': [null, Validators.pattern(mobileRegEx)]
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
  hideError() {
    this.error = null;
  }

  makeEditable() {
    this.is_readonly = false;
    // this.is_readonly = !this.is_readonly
  }
  findEmail(email) {
    let count = 0;
    for (let i = 0; i < this.emails.length; i++) {
      if (this.emails[i] == email) {

        alert(email);
        this.loadProfile(email);
        //this.email1=email;
        //alert(this.email1);
        //this.model.setValue({});
        count++;
        break;
        // return email;

      }

    }
    if (count == 0) {
      alert('not found');
    }
  }
  loadProfile(email) {
    console.log(email)

    this.model.setValue({
      'partnerEmail': email,
      'partnerFName': "",
      'partnerMName': "",
      'partnerLName': "",
      'partnerGender': "",
      'partnerDob':"",
      'partnerPhone': ""
    })
  }

  // findEmailfromdata(email) {
  //   let count = 0;
  //   for (let i = 0; i < this.datas.length; i++) {
  //     if (this.dataemails[i] == email) {

  //       alert(email);
  //       this.loadProfile(email);
  //       //this.email1=email;
  //       //alert(this.email1);
  //       //this.model.setValue({});
  //       count++;
  //       break;
  //       // return email;

  //     }

  //   }
  //   if (count == 0) {
  //     alert('not found');
  //   }
  // }

}
