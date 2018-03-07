import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class BookingsService {
  constructor(public db: AngularFireDatabase) {
  }

  updateBooking(stage: string, booking: any) {
    booking.stage = stage;
    return this.db.list('/booking').update(booking.key, booking);
}

getAllBookingsByUid(uid: string) {
    return this.db.list('/booking', ref => ref.orderByChild('customerId').equalTo(uid));
}

storeBooking(data){
    let book=this.db.list('/booking');
    book.push(data);
  }

  updateCustomerBooking(key,data){
    let book=this.db.list('/booking');
    book.update(key,data);
  }

  acceptBooking(key,json){
    json.stage="accepted";
    let book=this.db.list('/booking');
    book.set(key.key,json)
  }

  rejectBooking(key,json){
    let book=this.db.list('/booking');
    json.stage="rejected";
    book.set(key.key,json)
  }

}
