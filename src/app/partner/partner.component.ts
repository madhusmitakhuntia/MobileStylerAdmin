import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PartnerService } from '../services/partner.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase} from 'angularfire2/database';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { ProductService } from '../services/product.service';
declare var $: any;

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  selectedFile: File;
  profile_pic: any ="";
  ref:any="";
  task:any="";
  partners: any = {};
  items: any = [];
  partnerkey: any = [];
  partkey: any = [];
  services: any = [];
  service_arr: any = [];
  service_key: any = [];
  service_result: any = [];
  bookings: any = [];
  bookings_arr: any = [];
  bookingkey: any = [];
  booking_result: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users: any = {};
  partnerTable: any = true;
  serviceTable: any = true;
  updatePartner: any = true;
  bookingTable: any = true;
  modal_opened: any = true;
  not_found: boolean = true;

  search_name: boolean = true;
  search_phone: boolean = true;
  search_email: boolean = false;
  search_date: boolean = true;

  searchPartnerByName: any = {
    partnerFname: '',
    partnerLname: ''
  }
  searchPartnerByEmail: any = {
    email: ''
  }

  searchPartnerByPhone: any = {
    partnerPhone: ''
  }

  searchPartnerByDate: any = {
    partnerfDate: '',
    partnertDate: ''
  }

  updatePartnerdetail: any = {
    partnerKey: '',
    partnerFirstname: '',
    partnerLastname: '',
    partnerEmail: '',
    partnerGender: '',
    partnerMobile: ''

  }

  constructor(private fb: FormBuilder, private partnerService: PartnerService, public db: AngularFireDatabase, private productService: ProductService) {

    this.searchPartnerByName = {
      partnerFname: '',
      partnerLname: ''
    };
    this.searchPartnerByEmail = {
      email: ''
    };

    this.searchPartnerByPhone = {
      partnerPhone: ''
    };

    this.searchPartnerByDate = {
      partnerfDate: '',
      partnertDate: ''
    };
    this.updatePartnerdetail = {
      userKey: '',
      partnerFirstname: '',
      partnerLastname: '',
      partnerEmail: '',
      partnerGender: '',
      partnerMobile: ''

    };

    this.searchPartnerByName = fb.group({
      'partnerFname': [null],
      'partnerLname': [null]
    });
    this.searchPartnerByEmail = fb.group({
      'email': [null]

    });

    this.searchPartnerByPhone = fb.group({
      'partnerPhone': [null]

    });

    this.searchPartnerByDate = fb.group({
      'partnerfDate': [null],
      'partnertDate': [null]
    });
    this.updatePartnerdetail = fb.group({
      'userKey': [null],
      'partnerFirstname': [null],
      'partnerLastname': [null],
      'partnerEmail': [null],
      'partnerGender': [null],
      'partnerMobile': [null]

    });

  }

  ngOnInit() {
    this.partnerService.readPartner()
      .subscribe(partners => {
        this.partners = partners['partner'];
        console.log(this.partners);
        this.items = Object.values(this.partners);

        console.log(this.items);
        this.partkey = Object.keys(this.partners);

      });
    this.partnerService.readService()
      .subscribe(services => {
        this.services = services['service'];

        this.service_arr = Object.values(this.services);


        //console.log(this.service_arr);

        this.service_key = Object.keys(this.services);
      });
    this.productService.readBookings()
      .subscribe(bookings => {
        this.bookings = bookings['bookings'];

        this.bookings_arr = Object.values(this.bookings);


        // console.log(this.bookings_arr);

        this.bookingkey = Object.keys(this.bookings);
      })
  }
  searchPartnerName(fname, lname): void {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.searchPartnerByEmail.setValue({
      email: ''
    });
    this.searchPartnerByDate.setValue({
      partnerfDate: '',
      partnertDate: ''
    });
    this.searchPartnerByPhone.setValue({
      partnerPhone: ''
    });

    this.partnerService.readPartnerByName(fname, lname)
      .subscribe(partners => {
        this.partners = partners['partner'];
        //console.log(this.partners);
        this.items = Object.values(this.partners);

        this.partnerkey = Object.keys(this.partners);
        // console.log( "key"+this.customerKey);
        $('#DataTables').DataTable().destroy();
        this.dtTrigger.next();
      });
    this.partnerTable = false;
    this.serviceTable = true;
    this.bookingTable = true;
  }
  searchPartnerEmail(email): void {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.searchPartnerByName.setValue({
      partnerFname: '',
      partnerLname: ''
    });
    this.searchPartnerByDate.setValue({
      partnerfDate: '',
      partnertDate: ''
    });

    this.searchPartnerByPhone.setValue({
      partnerPhone: ''
    });
    // alert(email);

    this.partnerService.readPartnerByEmail(email)
      .subscribe(partners => {
        this.partners = partners['partner'];
        //console.log(this.partners);
        if (this.partners == null) {
          this.partnerTable = true;
          this.not_found = false;
          $('#DataTables').DataTable().destroy();
          this.items = [];
          this.partnerkey = [];

        }
        else {
          this.not_found = true;
          //console.log(this.partners);
          this.items = Object.values(this.partners);

          this.partnerkey = Object.keys(this.partners);
          // console.log( "key"+this.customerKey);
          $('#DataTables').DataTable().destroy();
          this.dtTrigger.next();
          this.partnerTable = false;
          this.serviceTable = true;
          this.bookingTable = true;
        }
      });

  }

  searchPartnerPhone(phone): void {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.searchPartnerByName.setValue({
      partnerFname: '',
      partnerLname: ''
    });
    this.searchPartnerByDate.setValue({
      partnerfDate: '',
      partnertDate: ''
    });

    this.searchPartnerByEmail.setValue({
      email: ''
    });
   

    this.partnerService.readPartnerByPhone(phone)
      .subscribe(partners => {
        this.partners = partners['partner'];
        //console.log(this.partners);
        if (this.partners == null) {
          this.partnerTable = true;
          this.not_found = false;
          $('#DataTables').DataTable().destroy();
          this.items = [];
          this.partnerkey = [];

        }
        else {
          this.not_found = true;
          //console.log(this.partners);
          this.items = Object.values(this.partners);

          this.partnerkey = Object.keys(this.partners);
          // console.log( "key"+this.customerKey);
          $('#DataTables').DataTable().destroy();
          this.dtTrigger.next();
          this.partnerTable = false;
          this.serviceTable = true;
          this.bookingTable = true;
        }
      });

  }

  searchPartnerDate(fdate, tdate): void {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.searchPartnerByName.setValue({
      partnerFname: '',
      partnerLname: ''
    });
    this.searchPartnerByEmail.setValue({
      email: ''
    });
    this.searchPartnerByPhone.setValue({
      partnerPhone: ''
    });
    this.partnerService.readPartnerByDate(fdate, tdate)
      .subscribe(partners => {
        this.partners = partners['partner'];
         if(this.partners==null){
         
          this.partnerTable = true;
          this.not_found = false;
          $('#DataTables').DataTable().destroy();
          this.items = [];
          this.partnerkey = [];
         }
         else{
          this.not_found = true;
          console.log('else condition');
              //console.log(this.partners);
              this.items = Object.values(this.partners);

              this.partnerkey = Object.keys(this.partners);
              // console.log( "key"+this.customerKey);
              $('#DataTables').DataTable().destroy();
              this.dtTrigger.next();
              this.partnerTable = false;
              this.serviceTable = true;
              this.bookingTable = true;

         }
      
      


      });

  }
  hideTable() {
    
    this.partnerTable = !this.partnerTable;
  }

  updatePartnerDetails(partner, fname, lname, email, gender, mobile) {
    this.updatePartner = !this.updatePartner;
    this.modal_opened = !this.modal_opened;
    this.updatePartnerdetail.setValue({
      'userKey': partner,
      'partnerFirstname': fname,
      'partnerLastname': lname,
      'partnerEmail': email,
      'partnerGender': gender,
      'partnerMobile': mobile,
      
    });
    //alert(partner+fname+lname+email+gender+mobile);

  }
  hidePartnerModal() {
    this.updatePartner = !this.updatePartner;
    this.modal_opened = !this.modal_opened;
  }
  onFileChanged(event) {
    //console.log(event);
       this.selectedFile = event.target.files[0];
       //console.log(this.selectedFile);
  }
  saveUpdateData(updatePartnerdetail) {
    updatePartnerdetail = this.updatePartnerdetail.value;
    //console.log(this.selectedFile);
    //alert(updatePartnerdetail);
    
    var json = {
      partnerFirstName: updatePartnerdetail.partnerFirstname,
      partnerLastName: updatePartnerdetail.partnerLastname,
      partnerEmail: updatePartnerdetail.partnerEmail,
      partnerGender: updatePartnerdetail.partnerGender,
      partnerPhone: updatePartnerdetail.partnerMobile,
      idCard:{
        name:"update",
        picture:this.profile_pic
      }
     
    }
  

    this.db.list('/partner').update(updatePartnerdetail.userKey, json);
    //console.log(json);
    //console.log(updatePartnerdetail.userKey);
    this.hidePartnerModal();
    this.partnerTable = true;
    this.serviceTable = true;
    this.bookingTable = true;
    //console.log(this.profile_pic);
  }
  viewService(partner, key) {
    // alert(partner+key);
    this.service_result = [];
    for (let service of this.service_key) {
      if (this.services[service].puid == key) {

        console.log(this.services[service].puid);
        this.service_result.push(service);
        console.log(this.service_result);


      }


    }
    this.serviceTable = false;
  }
  viewBooking(partner, key) {
    // alert(partner+key);
    this.booking_result = [];
    for (let booking of this.bookingkey) {
      if (this.bookings[booking].partnerId == key) {

        console.log(this.bookings[booking].partnerId);
        this.booking_result.push(booking);
        console.log(this.booking_result);


      }


    }
    this.bookingTable = false;
  }
  inactivePartner(partner){
    var json = {
      status:"inactive"
    }
    this.db.list('/partner').update(partner, json);
  }
  activePartner(partner){
    alert(partner);
    var json = {
      status:"active"
    }
    
    this.db.list('/partner').update(partner, json);

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
  open_search_name(){
    this.search_name = false;
    this.search_phone = true;
    this.search_email = true;
    this.search_date = true;
    
  }
  open_search_phone(){
    this.search_name = true;
    this.search_phone = false;
    this.search_email = true;
    this.search_date = true;
    
  }
  open_search_email(){
    this.search_name = true;
    this.search_phone = true;
    this.search_email = false;
    this.search_date = true;
    
  }
  open_search_date(){
    this.search_name = true;
    this.search_phone = true;
    this.search_email = true;
    this.search_date = false;
    
  }



  
  

}
