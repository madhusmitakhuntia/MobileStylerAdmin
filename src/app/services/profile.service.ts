import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileService {

  constructor(public db: AngularFireDatabase) {
    console.log('Hello Bookings Provider');
  }

 
  getProfileData(uid) {
    return this.db.list('/customer',ref => ref.orderByChild('uid').equalTo(uid)).valueChanges();
  }
  getPartnerProfile(id){
    return this.db.list('/partner',ref => ref.orderByChild('uid').equalTo(id)).valueChanges();
  }
  getProfileDataKeys(uid) {
    return this.db.list('/customer',ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges();
  }

  getProfileServices(uid){
    console.log('services')
    return this.db.list('/service',ref => ref.orderByChild('puid').equalTo(uid)).valueChanges();
  }

  getProfileServicesKeys(uid){
    console.log('services')
    return this.db.list('/service',ref => ref.orderByChild('puid').equalTo(uid)).snapshotChanges();
    }
  

  saveProfile(json){
    var partner_profile={
      'addresses':json.address,
      'createdAt':json.createdAt,
      'emailId':json.partnerEmail,
      'gender':json.partnerGender,
      'name':json.partnerName,
      'profilePicture':json.profilePicture,
      'partnerPhone':json.partnerPhone, 
      'uid':json.cuid

    };

    
    
    return this.db.list('/customer').push(partner_profile);
  }

  updateProfile(arr1,json){
    console.log(arr1[0].key)
    var partner_profile={
      'addresses':json.address,
      'createdAt':json.createdAt,
      'emailId':json.partnerEmail,
      'gender':json.partnerGender,
      'name':json.partnerName,
      'profilePicture':json.profilePicture,
      'partnerPhone':json.partnerPhone, 
      'uid':json.cuid
    };
    
    
    return this.db.list('/customer').update(arr1[0].key,partner_profile);
  }

  

}
