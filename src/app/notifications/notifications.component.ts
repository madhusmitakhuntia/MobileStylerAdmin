import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationsRef: any = [];
  notifications: any = [];
  
  constructor( public notificationService: NotificationsService) {
    this.notificationsRef = this.notificationService
            .getInAppNotificationsByUid(localStorage.getItem('uid'));
        this.notifications = this.notificationsRef.snapshotChanges().map(changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
        });
        console.log(this.notifications);
   }

  ngOnInit() {
  }

  removeNotification(notificationKey: any) {

    this.notificationsRef.remove(notificationKey)

}

}
