import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
class Partner {
  createdAt:string;
  partnerEmail: string;
  partnerFirstName: string;
  partnerGender: string;
  partnerLastName: string;
  partnerPhone: string;
  uid: string;
  status: string


}
class Service {

 createdAt: string;
 amount: number;
 partnerFirstName: string;
 partnerPhone: string;
 service: string;
 puid: string;
 status: string
}

@Injectable()
export class PartnerService {

  constructor(private _http : Http) {}
  readPartner(): Observable<Partner[]>{
    return this._http
        .get("https://us-central1-angularlogin-98e8f.cloudfunctions.net/getPartner")
        .map(res => res.json());
}
readService(): Observable<Service[]> {
    return this._http
        .get("https://us-central1-angularlogin-98e8f.cloudfunctions.net/getPartnerService")
        .map(res => res.json());
}
readPartnerByDate(from,to): Observable<Partner[]>{

    return this._http
        .get("https://us-central1-angularlogin-98e8f.cloudfunctions.net/getPartnerbydate?from="+from+"&to="+to)
        .map(res => res.json());
}
readPartnerByName(fname,lname): Observable<Partner[]>{
   
  
    return this._http
        .get("https://us-central1-partner-f3f0b.cloudfunctions.net/getPartnerbyname?fname="+fname+"&lname="+lname)
        .map(res => res.json());
}
readPartnerByEmail(email): Observable<Partner[]>{
    
    return this._http
        .get("https://us-central1-angularlogin-98e8f.cloudfunctions.net/getPartnerMail?email="+email)
        .map(res => res.json());
}

   

   }
 

  
