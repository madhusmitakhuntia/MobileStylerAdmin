import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
 import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataTablesModule } from 'angular-datatables';
//declare var $: any;

@Component({
  selector: 'app-getbooking',
  templateUrl: './getbooking.component.html',
  styleUrls: ['./getbooking.component.css'],
  providers: [ProductService]
})
// class Booking {

//   createdAt: string;
//   amount: number;
//   customerName: string;
//   partnerId: string;
//   services: string;
//   customerId: string;

// }
export class GetbookingComponent implements OnInit {
  products: any = {};
  items: any = [];
  users: any = {};
  userkey: any = [];
  result: any = [];
  booking_result: any = [];
  bookingkey: any = [];
  // dtOptions: DataTables.Settings = {}; 
  adressPage: any = true;
  bookingPage: any = true;
  modal_opened: boolean = true;

  updatePage: any = true;
  userTable: any = true;
  bookingTable: any = true;
  search: any = {
    searchFname: '',
    searchLname: '',
    searchEmail: ''
  };

  bookings:any = [];
  bookings_arr: any = {};
  constructor(private router: Router, private elementRef: ElementRef, private fb: FormBuilder, private productService: ProductService, public db: AngularFireDatabase) {
    this.search = fb.group({
      'searchFname': [null],
      'searchLname': [null],
      'searchEmail': [null]
    });
  }

  ngOnInit() {
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
        // console.log(bookings);
        this.bookings_arr = Object.values(this.bookings);
        // this.items1 = Object.values(this.items);



        // console.log(Object.values(this.items).length);
        // this.foundBooks = Array.of(this.foundBooks);

        console.log(this.bookings_arr);
        // console.log(this.items);
        this.bookingkey = Object.keys(this.bookings);
      })
  }

  findEmailfromdata(email, fname, lname) {
    //console.log(this.items);
    // alert(email);
    let count = 0;
    this.result = [];
    for (let user of this.userkey) {
      if (this.users[user].partnerEmail == email || this.users[user].partnerFirstName == fname && this.users[user].partnerLastName == lname) {

        console.log(this.users[user].partnerEmail);
        this.result.push(user);
        console.log(this.result);
        count++;

      }


    }
    this.userTable = false;
    this.bookingTable = true;

    if (count == 0) {
      alert('not found');
    }
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
