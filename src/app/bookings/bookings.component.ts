import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BookingsService } from "../services/bookings.service";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "../services/auth.service";
import { ServicesService } from '../services/services.service';
import { ProfileService } from "../services/profile.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  error;
  bookings: any = [];
  booking_data: any = [];
  keys: any = [];
  viewHeight;
  index: any = 0;
  pastBookingsList: any = [];
  upcomingBookingsList: any = [];
  loading: any;
  pet: any; //toggle model for tabs
  bookingList: boolean = false; //variable to handle show hide for bookings tab
  bookingPage: boolean = true;
  bookingsRef: any; // firebase ref object for bookings data
  bookPage: boolean = true; // model to handle edit booking popup

  editable_booking_data; // to handle selected booking data to edit

  /*to handle dropdown data*/
  category_data: any = [];
  sub_category_data: any = {}; // all sub categories structure
  sub_categories = []; // filtered sub categories based on category selection

  profile_data: any = {

  }


  addresses = [];
  customerName = '';

  /*model data for selected service data */
  details: any = {
    service: '',
    price: '',
    expertise: '',
    category: ''
  };

  added_services: any = []; //for listing selected services in booking popup

  amount: number = 0; // to caluclate total amount client to pay for selected services


  constructor(
    public bookingService: BookingsService,
    public serviceDB: ServicesService,
    public profileService: ProfileService,
    private authService: AuthService,
    public router: Router
  ) {

    /*model data for selected service data */
    this.details = {
      service: '',
      price: '',
      expertise: '',
      category: ''
    };


    this.viewHeight = window.innerHeight;
    console.log(this.viewHeight)
    this.viewHeight=this.viewHeight-50;



    if (localStorage.getItem('uid') === null) { // check if user loggedin. If not redirect to login page
      this.router.navigateByUrl('/login');
    } else {
      this.loading = false;
    };

    this.profileService.getProfileData(localStorage.getItem('uid'))
      .subscribe(
      ref => this.loadMyAddress(ref[0])
      );

    this.bookingsRef = bookingService.getAllBookingsByUid(localStorage.getItem('uid'));
    this.bookings = this.bookingsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.bookings.subscribe(ref => this.categorizeBookings(ref));

  }

  ngOnInit(){}


  addService() {
    let json = {
      'serviceName': this.details.category,
      'price': this.details.price,
      'speciality': this.sub_categories[this.details.speciality].name
    };
    this.amount += this.details.price;
    this.added_services.push(json);
    console.log(this.added_services)
  }

  /* to remove selected service from added services list in booking popup*/
  removeService(index) {
    console.log(index)

    this.added_services.splice(index, 1);
    this.caluclatePrice();
  }

  getSubCategories(service) {

    this.sub_categories = this.sub_category_data[this.details.category];
  }

  getAmount(data) {
    console.log(this.sub_categories[data].price)
    this.details.price = this.sub_categories[data].price;
  }

  caluclatePrice() {
    let price = 0;
    for (let x of this.added_services) {
      price += x.price;
    }
    this.amount = price;
  }

  loadMyAddress(data) {
    this.addresses = data.addresses;
    this.customerName = data.name;
  }

  categorizeBookings(bookingsList) {


    console.log(bookingsList)

    this.pastBookingsList = [];
    this.upcomingBookingsList = [];

    for (let i = 0; i < bookingsList.length; i++) {
      if (bookingsList[i].stage.toLowerCase() == 'end') {
        var date = new Date(bookingsList[i].bookingSchedule.date);
        console.log(date)
        var day = date.getDate(); //Date of the month: 2 in our example
        var month = date.getMonth(); //Month of the Year: 0-based index, so 1 in our example
        var year = date.getFullYear() //Year: 2013
        var hours = date.getHours();
        var Minutes = date.getMinutes();
        var seconds = date.getSeconds();
        bookingsList[i].dates = day + '-' + month + '-' + year;
        bookingsList[i].times = hours + ':' + Minutes + ':' + seconds;
        this.pastBookingsList.push(bookingsList[i]);
      } else {
        date = new Date(bookingsList[i].bookingSchedule.date);
        day = date.getDate(); //Date of the month: 2 in our example
        month = date.getMonth(); //Month of the Year: 0-based index, so 1 in our example
        year = date.getFullYear() //Year: 2013
        hours = date.getHours();
        Minutes = date.getMinutes();
        seconds = date.getSeconds();
        bookingsList[i].dates = day + '-' + month + '-' + year;
        bookingsList[i].times = hours + ':' + Minutes + ':' + seconds;
        this.upcomingBookingsList.push(bookingsList[i]);
      }
    }
    this.loading=true;
    
  }

  

  showBookingDetails(booking) {

    var date = new Date(booking.bookingSchedule.date);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var Minutes = date.getMinutes();
    var seconds = date.getSeconds();
    booking.dates = day + '-' + month + '-' + year;
    booking.times = hours + ':' + Minutes + ':' + seconds;
    this.booking_data = booking;
    this.togglePopUp();
  }

  togglePopUp() {
    this.bookingList = !this.bookingList;
    this.bookingPage = !this.bookingPage;
  }

  ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
      temp[a[i]] = true;
    return Object.keys(temp);
  }

  getServices(services, data) {
    console.log(services);
    console.log(services.length)
    for (let i = 0; i < services.length; i++) {
      if (services[i].service) {
        if (this.category_data.indexOf(services[i].service))
          this.category_data.push(services[i].service);

        if (this.sub_category_data[services[i].service]) {
          this.sub_category_data[services[i].service].push({
            "name": services[i].speciality,
            "price": services[i].amount
          })
        } else {
          this.sub_category_data[services[i].service] = [];
          this.sub_category_data[services[i].service].push({
            "name": services[i].speciality,
            "price": services[i].amount
          })
        }
      }

      console.log(this.sub_category_data);
      console.log(data);
      this.details = data;
      this.added_services = data.services;
      this.amount = data.totalAmount;
      this.details.myTime = data.bookingSchedule.time;
      this.details.myDate = data.bookingSchedule.date;
      this.details.address = this.findAddressIndex(data.customerAddress.name);

      this.bookPage = false;
      this.bookingPage = true;
      this.loading=true;
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

  showBookPage(data) {
    console.log(data)
    this.profileService.getPartnerProfile(data.partnerId).subscribe(
      ref => {
        console.log(ref)
        this.profile_data = ref[0];
      }
    )
    this.serviceDB.getAllPartnerServices(data.partnerId)
      .subscribe(ref => this.getServices(ref, data));
  }

  editBooking(data) {
    this.loading=false;
    console.log(data);
    this.editable_booking_data = data;
    this.showBookPage(data)

  }

  updateBooking(data) {

    if (localStorage.getItem('uid') === null) {
      this.router.navigateByUrl('/login')
    } else
      if (localStorage.getItem('uid')) {

        var json = {
          bookingSchedule: {
            date: this.details.myDate,
            time: this.details.myTime
          },
          customerAddress: this.addresses[this.details.address],
          customerId: localStorage.getItem('uid'),
          createdAt: this.editable_booking_data.createdAt,
          updatedAt: new Date().toISOString(),
          partnerId: this.editable_booking_data.partnerId,
          services: this.added_services,
          stage: 'pending',
          totalAmount: this.amount,
          customerName: this.customerName,
          notes: this.details.notes,

        }
        console.log(json)
        let arrayOfKeys = Object.keys(json);
        let error = false;

        for (let obj of arrayOfKeys) {
          if (obj == 'address2' || obj == 'geofire' || obj == 'status') { }
          else
            if (!(json[obj]) || json[obj] == "") {
              error = true;
              this.loadError("please provide valid " + obj);
              break;
            }
        }
        if (!error) {
          console.log(json)
          this.hideBookPage();
          this.bookingService.updateCustomerBooking(this.editable_booking_data.key, json);
        }

      } else {
        this.router.navigateByUrl('/login')
      }

  }
  loadError(message) {
    this.loading = true;
    this.error = message;

  }


  hideBookPage() {
    this.bookPage = true;
    this.bookingList = false;
    this.bookingPage = true;
  }


}
