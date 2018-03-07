import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  stripeUrl: string;
  viewHeight;
  stripeRedirectUrl: string;
  isStripeActivated: string;
  stripeDashboard: string;
  stripeAccountId: string;

  error;
  model: any = {
    partnerName: '',
    partnerGender: 'male',
    partnerEmail: '',
    partnerPhone: ''
  };

  loader = true;
  modal_opened: boolean = true;
  deposit: any = {
    account_number: '',
    routing_number: '',
    account_type: ''
  };
  address: any = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state: ''
  };

  service: any = {
    service: '',
    speciality: '',
    location: '',
    serverRadius: '',
    amount: '0.00'
  }


  profile_pic: any = "https://cdn2.f-cdn.com/files/download/24619452/natural+background.png";
  flag: boolean = false;

  categories = [];
  sub_categories = [];

  addresses: any = [];
  services = [];

  file_name: any = '';
  file_src: any;

  profile_editable: boolean = true;
  deposit_editable: boolean = true;
  createdAt: any;
  category_data: any = ["Haircuts", "Color Services", "Hair Treatments", "Hair Styling", "Hands", "Feet"];
  sub_category_data: any = {
    "Haircuts": [
      { "name": "Men's Haircut" },
      { "name": "Women's Haircut" },
      { "name": "Men's Barber" }
    ], "Color Services": [
      {
        "name": "Retouch"
      },
      {
        "name": "Highlights/Balayage"
      },
      {
        "name": "Ombre"
      },
      {
        "name": "All over coloring "
      },
      {
        "name": "Color Correction "
      }
    ], "Hair Treatments": [
      {
        "name": "Deep Conditioning"
      },
      {
        "name": "Brazilian Blowout"
      },
      {
        "name": "Keratin"
      },
      {
        "name": "Perms"
      }
    ], "Hair Styling": [
      {
        "name": "Blow outs"
      },
      {
        "name": "Up/Down Dos"
      },
      {
        "name": "Hair Extensions "
      }
    ], "Hands": [
      {
        "name": "Manicure"
      },
      {
        "name": "Acrylic"
      },
      {
        "name": "Dip Powder"
      },
      {
        "name": "Gel"
      }
    ], "Feet": [
      {
        "name": "Basic Pedicure"
      },
      {
        "name": "Spa Pedicure"
      }
    ], "Makeup Artist": [
      {
        "name": "Special Occasion"
      },
      {
        "name": "Bridal"
      }
    ], "Waxing Technician": [
      {
        "name": "Facial"
      },
      {
        "name": "Arms"
      },
      {
        "name": "Legs"
      },
      {
        "name": "Brazilian"
      },
      {
        "name": "Back"
      }
    ]
  };
  service_radius = [5, 10, 15, 20, 25];

  serviceKeys: any = [];
  profileKeys: any = [];
  loading: any;

  adressPage: any = true;
  profilePage: any = false;
  servicePage: any = true;

  constructor(private router: Router, public profileService: ProfileService, public _auth: AuthService,
    private elementRef: ElementRef, private fb: FormBuilder
  ) {


    this.loader = false;
    this.stripeUrl = 'https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_C43Pb2cbOsFdeelqzwwsJ3xzcSWKxmLv&scope=read_write&state=';
    this.stripeRedirectUrl = 'http://us-central1-mobile-styler-dev.cloudfunctions.net/stripeConnectCallback';
    this.stripeDashboard = 'http://us-central1-mobile-styler-dev.cloudfunctions.net/stripeDashboard';


    this.model = {
      partnerName: '',
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
    this.service = {
      service: '',
      speciality: '',
      location: '',
      serverRadius: '',
      amount: '0.00'
    }

    this.categories = [
      { name: 'Hair Color' }
    ];
    /* validating form code*/
    let mobileRegEx = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; //  regular expression for us number

    this.model = fb.group({
      'partnerName': [null, Validators.required],
      'partnerGender': [null, Validators.required],
      'partnerEmail': [null, Validators.email],
      'partnerPhone': [null, Validators.pattern(mobileRegEx)]
    });

    let stateCodeRegex = /^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/;
    let cityCodeRegex = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    let zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    this.address = fb.group({
      'name': [null, Validators.required],
      'address1': [null, Validators.required],
      'address2': [null],
      'city': [null, Validators.required,Validators.pattern(cityCodeRegex)],
      'state': [null,  Validators.required],
      'zip': [null,  Validators.required]
    });


    profileService.getProfileData(localStorage.getItem('uid'))
      .subscribe(
      ref => this.loadProfileDataOnUI(ref[0])
      );

    profileService.getProfileDataKeys(localStorage.getItem('uid'))
      .subscribe(
      ref => this.loadProfileKeys(ref)
      );



  }

  loadProfileKeys(json) {
    this.profileKeys = JSON.parse(JSON.stringify(json));

    this.loader = true;
  }

  loadServiceDataKeys(json) {
    this.serviceKeys = JSON.parse(JSON.stringify(json));

  }

  loadProfileDataOnUI(json) {
    console.log(json)
    json = (JSON.parse(JSON.stringify(json)));
    this.model.setValue({
      'partnerName': json.name,
      'partnerGender': json.gender,
      'partnerEmail': json.emailId,
      'partnerPhone': json.partnerPhone
    })
    if (json.addresses)
      this.addresses = json.addresses;
    // this.model.value.partnerEmail = json.partnerEmail;
    //this.model.value.partnerEmail = json.partnerGender;
    //this.model.value.partnerName = json.partnerName;
    this.profile_pic = json.profilePicture;
    //this.model.value.partnerPhone = json.partnerPhone;

    this.createdAt = json.createdAt;
    this.isStripeActivated = json.stripe.isStripeActivated;
    this.stripeAccountId = json.stripe.stripeAccountId;
  }

  loadServiceData(json) {
    console.log(json);
    this.services = [];
    json = JSON.parse(JSON.stringify(json));

    for (let i = 0; i < json.length; i++) {

      this.services[i] = json[i];
      this.services[i].key = this.serviceKeys[i].key;
      if (json[i].status)
        this.services[i].status = json[i].status;
      else
        this.services[i].status = false;
      if (json[i].service == "") {
        this.services[i].status = true;
      }
    }



  }

  hideError() {
    this.error = null;
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

  showUpdateAddress() {
    this.adressPage = !this.adressPage;
    this.modal_opened = !this.modal_opened;
  }
  getSubCategories() {

    this.sub_categories = this.sub_category_data[this.service.service];
  }

  clearForm() {

    this.address = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      state: ''
    };
    this.service = {
      category: '',
      speciality: '',
      location: '',
      radius: '',
      price: '',
    }
  }


  saverange($e, d) {

    if (this.model.phone) {
      var x = this.model.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.model.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }

  }

  addAddress(addressData) {
    addressData = addressData.value;
    var json = {
      name: addressData.name,
      address1: addressData.address1,
      address2: addressData.address2,
      city: addressData.city,
      zip: addressData.zip,
      state: addressData.state,
      geofire: false,
      status: false
    }
    console.log(json)
    let arrayOfKeys = Object.keys(json);
    let error = false;

    for (let obj of arrayOfKeys) {
      if (obj == 'address2' || obj == 'geofire' || obj == 'status') { }
      else
        if (!(json[obj]) || json[obj] == "" || json[obj].length < 2) {
          error = true;
          this.loadError("please provide valid " + obj);
          break;
        }
    }
    if (!error) {
      this.addresses.push(json);
      this.showAddress();
    }

  }

  saveProfile() {
    if (this.profile_editable) {
      console.log(this.model)
    }
    this.profile_editable = !this.profile_editable;
  }

  saveDeposit() {
    if (this.deposit_editable) {
      console.log(this.deposit)
    }
    this.deposit_editable = !this.deposit_editable;
  }


  /* get values into popup for edit*/
  updateAddress(i, addressData) {
    console.log(addressData )
    
    console.log(addressData)
    this.address.setValue(
      {
        name: addressData.name,
        address1: addressData.address1,
        address2: addressData.address2,
        city: addressData.city,
        zip: addressData.zip,
        state: addressData.state,
  
      }
    );
    this.address.index = i;

  }

  /*store updated address data */
  saveUpdatedAddress(addressData) {
    addressData = addressData.value;
    console.log(addressData)
    var json = {
      name: addressData.name,
      address1: addressData.address1,
      address2: addressData.address2,
      city: addressData.city,
      zip: addressData.zip,
      state: addressData.state,

    }

    this.addresses[addressData.index - 1] = json;
    this.address = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      state: ''
    };
    this.showAddress();

  }

  /*remove address from stack*/
  removeAddress(index) {
    console.log(index)
    index = index - 1;

    console.log("updted" + index)
    let temp = [];
    for (let j = 0; j < this.addresses.length; j++) {
      if (j != index) {
        var json = {
          name: this.addresses[j].name,
          address1: this.addresses[j].address1,
          address2: this.addresses[j].address2,
          city: this.addresses[j].city,
          zip: this.addresses[j].zip,
          state: this.addresses[j].state
        }
        temp.push(json);
      }

    }
    this.addresses = temp;
    this.showAddress();
  }

  saveUpdatedService(service) {

    console.log(service.index)
    var json = {
      service: service.service,
      speciality: service.speciality,
      location: this.addresses[service.location],
      serverRadius: service.serverRadius,
      amount: service.amount,
      status: false
    };
    console.log(json)
    this.services[service.index - 1] = json;
    this.service = {
      service: '',
      speciality: '',
      location: '',
      serverRadius: '',
      amount: '',
    }
    this.showUpdateServiceCard();
  }

  /*functions to handle service data */

  showService() {

    this.service.index = null;
    this.service = {
      service: '',
      speciality: '',
      location: '',
      serverRadius: '',
      amount: '0.00'
    }
    alert(this.servicePage)
    this.servicePage = !this.servicePage;
    this.modal_opened = !this.modal_opened;
  }

  hideServiceModal() {
    this.servicePage = !this.servicePage;
    this.modal_opened = !this.modal_opened;
  }

  showUpdateServiceCard() {
    alert();
    this.servicePage = !this.servicePage;
    this.modal_opened = !this.modal_opened;
  }


  addService(service) {
    var json = {
      service: service.service,
      speciality: service.speciality,
      location: this.addresses[service.location],
      serverRadius: service.serverRadius,
      amount: service.amount,
      status: false
    };


    let arrayOfKeys = Object.keys(json);
    let error = false;

    for (let obj of arrayOfKeys) {
      if (obj == 'status') { }
      else
        if (!(json[obj]) || json[obj] == "") {
          error = true;
          this.loadError("please provide valid " + obj);
          break;
        }
    }
    if (!error) {
      this.services.push(json);
      console.log(this.services)
      this.showService();
    }
  }

  findAddressIndex(name) {
    console.log(this.addresses)
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].name == name) {
        return i;
      }
    }
  }

  updateService(i, service) {
    console.log(service)
    console.log(service.location.name)
    console.log(this.findAddressIndex(service.location.name))
    var json = {
      service: service.service,
      speciality: service.speciality,
      location: this.findAddressIndex(service.location.name),
      serverRadius: service.serverRadius,
      amount: service.amount,
      status: false
    };
    this.service = json;
    this.service.index = i + 1;
    this.getSubCategories();

  }

  removeService(index) {
    index = index - 1;
    this.services[index].status = true;
    console.log(this.services)
    /*let temp = [];
    for (let j = 0; j < this.services.length; j++) {
        if (j != index) {
            temp.push(this.services[j]);
        }
        this.services = temp;
    }*/
    this.showService();
  }

  imageChange($event): void {
    this.readThis($event.target);
  }

  profileImageChange($event): void {
    this.readProfileImage($event.target);
  }

  readProfileImage(inputValue: any): void {
    var file: File = inputValue.files[0];


    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.profile_pic = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    console.log(file)
    this.file_name = file.name;

    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.file_src = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  save() {

    this.error = null;
    this.loader = false;
    let data = this.model.value;
    var d = new Date();
    var n = d.toISOString();
    let json = data;

    json.address = this.addresses;
    json.profilePicture = this.profile_pic;
    json.partnerPhone = data.partnerPhone;

    json.createdAt = n;
    json.cuid = localStorage.getItem('uid');

    console.log("data" + JSON.stringify(json));
    this.flag = false;


    let arrayOfKeys = Object.keys(data);
    let error = false;

    for (let obj of arrayOfKeys) {
      if (!(data[obj])) {

        error = true;
        this.loadError("please provide " + obj);

        break;
      }
    }
    if (!error) {

      console.log(json)
      this.setTimer();
      this.profileService.updateProfile(this.profileKeys, json).then(resolve => {

        this.profileService.getProfileData(localStorage.getItem('uid'))
          .subscribe(
          ref => this.loadProfileDataOnUI(ref[0])
          );

        this.profileService.getProfileDataKeys(localStorage.getItem('uid'))
          .subscribe(
          ref => this.loadProfileKeys(ref)
          );

        this.profileService.getProfileServices(localStorage.getItem('uid'))
          .subscribe(
          ref => this.reloadPage(ref)
          );

        this.profileService.getProfileServicesKeys(localStorage.getItem('uid'))
          .subscribe(
          (ref) => this.loadServiceDataKeys(ref)

          );

      }, reject => {
        this.loader = true;
        this.loadError(reject);
      });

    }
  }

  reloadPage(ref) {
    this.loadServiceDataKeys(ref)
    this.loader = true;
  }

  setTimer() {
    setTimeout(() => {
      this.loadError('Please check your network and try again')
    }, 20000);
  }





  loadError(message) {
    this.loader = true;
    this.error = message;

  }

  goToLogin() {
    this.router.navigateByUrl('');

  }


  signOut(): void {
    localStorage.clear();

    this._auth.signoutUser().then(res => {

      this.router.navigateByUrl('');
    }).catch(err => {
      alert(err.message);
    });

  }


  ngOnInit() {
  }

  signup() {
    this.router.navigateByUrl('/login');
  }

}
