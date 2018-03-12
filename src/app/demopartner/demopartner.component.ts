import { Component, OnInit, ElementRef } from '@angular/core';


import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-demopartner',
  templateUrl: './demopartner.component.html',
  styleUrls: ['./demopartner.component.css']
})
export class DemopartnerComponent implements OnInit {

  error;
  email=['brahmi@gmail.com','abhi@gmail.com'];
  datas:any = [
    { email: "saobikram@gmail.com", fname: 'Bikram', mname:'', mobile: '1234567890', lname: 'Sao' },
    { email: "brahmi@gmail.com", fname: 'Brahmi',mname:'', mobile: '9876543211', lname: 'Devi' },
    { email: "abhi@gmail.com", fname: 'Abhi', mname:'kumar', mobile: '1234123412', lname: 'Behera' }
  ];
  email1:string;
  model: any = {
    partnerFirstName: '',
    partnerGender: 'male',
    partnerMiddleName:'',
    partnerLastName:'',
    partnerEmail: '',
    partnerPhone: '',
    partnerDob:'',
    partnerDoc:''
  };
  check:any={
    partnerfName:'',
    partnercEmail:'',
    partnerlName:''
  };

   address: any = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state: ''
  };

  modal_opened: boolean = true;
  adressPage: any = true;
  

  constructor( private fb: FormBuilder) {
    this.model = {
      partnerFirstName: '',
    partnerGender: 'male',
    partnerMiddleName:'',
    partnerLastName:'',
    partnerEmail: '',
    partnerPhone: '',
    partnerDob:'',
    partnerDoc:''

    };
    this.check={
      partnerfName:'',
      partnercEmail:'',
      partnerlName:''
    };
  
    this.address = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      state: ''
    };
   
   
    /* validating form code*/
    let mobileRegEx = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; //  regular expression for us number
    let nameRegEx = /^[a-zA-Z ]{2,30}$/;// validation for name to accept only letter and space

    this.model = fb.group({
      'partnerfName': [null, Validators.pattern(nameRegEx)],
      'partnerlName': [null, Validators.pattern(nameRegEx)],
      'partnercEmail': [null, Validators.email]
      

    });

    /* address popup form validation*/
    let stateCodeRegex = /^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/;
    let cityCodeRegex = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    // let zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let zipCodeRegex = /^\d+$/;
    this.address = fb.group({
      'name': [null, Validators.pattern(nameRegEx)],
      'address1': [null, Validators.required],
      'address2': [null],
      'city': [null, Validators.required],
      'state': [null, Validators.pattern(stateCodeRegex)],
      'zip': [null, Validators.pattern(zipCodeRegex)]
    });
    this.model = fb.group({
      'partnerFirstName': [null, Validators.pattern(nameRegEx)],
      'partnerGender': [null, Validators.required],
      'partnerMiddleName': [null, Validators.pattern(nameRegEx)],
      'partnerLastName': [null, Validators.pattern(nameRegEx)],
      'partnerEmail': [null, Validators.email],
      'partnerPhone': [null, Validators.pattern(mobileRegEx)],
      'partnerDob':[null,Validators.required],
      'partnerDoc':[null,Validators.required]

    });

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

  findEmail(email) {
    let count=0;
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].email == email) {

        //alert(email);
        //this.email1=email;
        //alert(this.email[i]);
    //this.model.setValue({});
   
       // return email;
       this.loadProfilefromdata(this.datas[i].email,this.datas[i].fname, this.datas[i].mobile, this.datas[i].lname );
        count++;
        break;

      }

    }
    if(count==0)
    {
      alert('not found');
    }
  
  }
  loadProfilefromdata(email,fname,mobile,lname) {
  
    this.model.setValue({
        
        'partnerEmail': email,
     'partnerFirstName':fname,
     'partnerMiddleName': "",
     'partnerLastName':lname,
     'partnerGender': "",
     
     'partnerPhone': mobile,
     'partnerDob':"",
     'partnerDoc':""
      
    });
  }



  ngOnInit() {
  }

 

}
