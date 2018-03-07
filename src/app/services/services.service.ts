import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()
export class ServicesService {

    constructor(public db: AngularFireDatabase) {
    }

    getAllServices(key) {
        return this.db.object('/service/'+key).valueChanges();
      }
    
      getAllPartnerServices(puid) {
        return this.db.list('/service',ref => ref.orderByChild('puid').equalTo(puid)).valueChanges();
      }
    
      getAllServicesByName(name){
        return this.db.list('/service',ref => ref.orderByChild('speciality').equalTo(name)).snapshotChanges();
      }

}
