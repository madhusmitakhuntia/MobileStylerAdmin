import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http/src/client';


@Injectable()
export class UpdateprofileService {

  constructor(public db: AngularFireDatabase) { }
  updateData(data)
  {
    var partner_profile={
      
    };
    return this.db.list('/customer').push(partner_profile);
  }

}
