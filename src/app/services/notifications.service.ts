import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()
export class NotificationsService {

  constructor(public db: AngularFireDatabase) {
  }

  getInAppNotificationsByUid(uid: string) {
      return this.db.list('/notification', ref => ref.orderByChild('uid').equalTo(uid));
  }

}
