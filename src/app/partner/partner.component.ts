import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PartnerService } from '../services/partner.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
declare var $: any;

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  partners: any = {};
  items: any = [];
  partnerkey: any = [];
  partkey:any=[];
  services: any =[];
  service_arr: any =[];
  service_key: any =[];
  service_result: any = [];
  dtOptions: DataTables.Settings = {}; 
  dtTrigger: Subject<any> = new Subject();
  users: any = {};
  partnerTable:any = true;
  serviceTable: any = true;
  updatePartner: any = true;
  modal_opened: any=true;

  searchPartnerByName:any={
    partnerFname:'',
    partnerLname:''
  }
  searchPartnerByEmail:any={
    email:''
  }
  searchPartnerByDate:any={
    partnerfDate:'',
    partnertDate:''
  }

  updatePartnerdetail:any={
    partnerKey:'',
    partnerFirstname:'',
    partnerLastname:'',
    partnerEmail:'',
    partnerGender:'',
    partnerMobile:''

  }

  constructor( private fb: FormBuilder,private partnerService:PartnerService,public db: AngularFireDatabase) {
    
    this.searchPartnerByName={
      partnerFname:'',
      partnerLname:''
    };
    this.searchPartnerByEmail={
      email:''
    };
    this.searchPartnerByDate={
      partnerfDate:'',
      partnertDate:''
    };
    this.updatePartnerdetail={
      userKey:'',
      partnerFirstname:'',
      partnerLastname:'',
      partnerEmail:'',
      partnerGender:'',
      partnerMobile:''
  
    };

    this.searchPartnerByName=fb.group({
      'partnerFname':[null],
      'partnerLname':[null]
    });
    this.searchPartnerByEmail=fb.group({
      'email':[null]
      
    });
    this.searchPartnerByDate=fb.group({
      'partnerfDate':[null],
      'partnertDate':[null]
    });
    this.updatePartnerdetail=fb.group({
      'userKey':[null],
      'partnerFirstname':[null],
     'partnerLastname':[null],
      'partnerEmail':[null],
      'partnerGender':[null],
      'partnerMobile':[null]
  
    });

   }

  ngOnInit() {
    this. partnerService.readPartner()
    .subscribe(partners => {
      this.partners = partners['partner'];
    
      this.items = Object.values(this.partners);

        // console.log(this.items);
       this.partkey = Object.keys(this.partners);

    });
    this. partnerService.readService()
    .subscribe(services => {
      this.services = services['service'];
    
      this.service_arr = Object.values(this.services);
     

      //console.log(this.service_arr);
      
      this.service_key = Object.keys(this.services);
    })
  }
  searchPartnerName(fname,lname): void  {
    this.dtOptions = {
      pagingType: 'full_numbers'
     
    };
    this.partnerService.readPartnerByName(fname,lname)
    .subscribe(partners => {
      this.partners = partners['partner'];
      //console.log(this.partners);
       this.items = Object.values(this.partners);
       
       this.partnerkey = Object.keys(this.partners);
     // console.log( "key"+this.customerKey);
        $('#DataTables').DataTable().destroy();
         this.dtTrigger.next();
    });
    this.partnerTable=false;
   // this.serviceTable = true;
  }
  searchPartnerEmail(email): void  {
    this.dtOptions = {
      pagingType: 'full_numbers'
     
    };
    alert(email);
    this.partnerService.readPartnerByEmail(email)
    .subscribe(partners => {
      this.partners = partners['partner'];
      //console.log(this.partners);
       this.items = Object.values(this.partners);
       
       this.partnerkey = Object.keys(this.partners);
      console.log( "keyyy"+this.partnerkey);
        $('#DataTables').DataTable().destroy();
         this.dtTrigger.next();
    });
    this.partnerTable=false;
   // this.serviceTable = true;
  }
  searchPartnerDate(fdate,tdate): void  {
    this.dtOptions = {
      pagingType: 'full_numbers'
     
    };
    this.partnerService.readPartnerByDate(fdate,tdate)
    .subscribe(partners => {
      this.partners = partners['partner'];
      //console.log(this.partners);
       this.items = Object.values(this.partners);
       
       this.partnerkey = Object.keys(this.partners);
     // console.log( "key"+this.customerKey);
        $('#DataTables').DataTable().destroy();
         this.dtTrigger.next();
    });
    this.partnerTable=false;
   // this.serviceTable = true;
  }

  updatePartnerDetails(partner,fname,lname,email,gender,mobile)
  {
    this.updatePartner = !this.updatePartner;
    this.modal_opened = !this.modal_opened;
    this.updatePartnerdetail.setValue({
      'userKey':partner,
      'partnerFirstname':fname,
     'partnerLastname':lname,
      'partnerEmail':email,
      'partnerGender':gender,
      'partnerMobile':mobile
    });
    //alert(partner+fname+lname+email+gender+mobile);

  }
  hidePartnerModal()
  {
    this.updatePartner = !this.updatePartner;
    this.modal_opened = !this.modal_opened;
  }
  saveUpdateData(updatePartnerdetail)
  {
    updatePartnerdetail=this.updatePartnerdetail.value;
    var json={
      partnerFirstName:updatePartnerdetail.partnerFirstname,
      partnerLastName:updatePartnerdetail.partnerLastname,
      partnerEmail:updatePartnerdetail.partnerEmail,
      partnerGender:updatePartnerdetail.partnerGender,
      partnerPhone:updatePartnerdetail.partnerMobile
    }
    this.db.list('/partner').update(updatePartnerdetail.userKey,json);
    this.hidePartnerModal();
  }
  viewService(partner,key)
  {
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


}
