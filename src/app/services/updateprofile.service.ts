import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http/src/client';


@Injectable()
export class UpdateprofileService {

  constructor(public db: AngularFireDatabase) { }
  updateData(data,pro)
  {
    console.log(pro);
    let json = data;
    console.log("data" + JSON.stringify(json));
   
    var partner_profile={
      'pname':json.productName,
      'price':json.price,
      'likes':json.like
      
    };
    var partner_profile1=JSON.stringify(partner_profile);
    console.log("partner_profile"+partner_profile1+json.productName);
   return this.db.list('/products').update(pro,{pname:'oyz'});
  }

}
