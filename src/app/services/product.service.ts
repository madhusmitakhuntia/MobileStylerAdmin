import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { Product } from './product';
// import { Client } from './client';
class Person {
 
    // public id: number,
     createdAt:string;
     partnerEmail: string;
     partnerFirstName: string;
    partnerGender: string;
   partnerLastName: string;
    // public MiddleName: string,
     partnerPhone: string;
    profilePicture: string;
     uid: string

}
class Booking {

    createdAt: string;
    amount: number;
    customerName: string;
    partnerId: string;
    services: string;
  
  }
  
@Injectable()
 
// Service for products data.
export class ProductService {
 
    // We need Http to talk to a remote server.
    constructor(private _http : Http){ }
 
    // Get list of products from remote server.
    // readProducts(): Observable<Product[]>{
    //     return this._http
    //         .get("https://us-central1-sign-up-angular.cloudfunctions.net/getProducts")
    //         .map(res => res.json());
    // }

    // Get list of users from remote server.
    readUsers(): Observable<Person[]>{
        return this._http
            .get("https://us-central1-mobilestyler-admin.cloudfunctions.net/getCustomer")
            .map(res => res.json());
    }
    readBookings(): Observable<Booking[]> {
        return this._http
            .get("https://us-central1-mobilestyler-admin.cloudfunctions.net/getBookings")
            .map(res => res.json());
    }
    readUserByDate(from,to): Observable<Person[]>{
  
        return this._http
            .get("https://us-central1-mobilestyler-admin.cloudfunctions.net/getCustomerbydate?from="+from+"&to="+to)
            .map(res => res.json());
    }
    // readUserByName(fname,lname): Observable<Person[]>{
    //     // alert(fname);
    //     // alert(lname);
      
    //     return this._http
    //         .get("https://us-central1-mobilestyler-admin.cloudfunctions.net/getCustomerbyname?fname="+fname+"&lname="+lname)
    //         .map(res => res.json());
    // }
    readUserByName(fname): Observable<Person[]> {
        // alert(fname);
        // alert(lname);

        return this._http
            .get("https://us-central1-mobilestyler-admin.cloudfunctions.net/getCustomerbyfname?fname=" + fname)
            .map(res => res.json());
    }
    readUserByEmail(email): Observable<Person[]>{
        
        return this._http
            .get("https://us-central1-mobilestyler-admin.cloudfunctions.net/getCustomerbyemail?email="+email)
            .map(res => res.json());
    }
  
 
}
