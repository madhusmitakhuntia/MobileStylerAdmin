import { Component, OnInit } from '@angular/core';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDateFormatter } from 'angular-calendar';

import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { ProductService } from '../services/product.service';
import { PartnerService } from '../services/partner.service';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

  styleUrls: ['./graph2.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class Graph2Component implements OnInit {

  items: any = [];
  partdata:any=[];
  users: any = {};
  userkey: any = [];
  partners: any = {};
  textmodal: any = true;
  partnerkey: any = [];
  view: string = 'month';

  @ViewChild('modalContent') modalContent: TemplateRef<any>;



  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };



  refresh: Subject<any> = new Subject();
  // events: CalendarEvent[] = [
  //   // {
  //   //   start: startOfDay("Thu May 1 2018 10:43:11 GMT+0530 (India Standard Time)"),
  //   //   //end: addDays(new Date(), 1),
  //   //   title: 'Has custom class',
  //   //   color: colors.yellow,


  //   // }
  // ];
  events: CalendarEvent[] = [];


  activeDayIsOpen: boolean = false;



  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {

  //       this.activeDayIsOpen = false;

  //     } else {
  //       this.activeDayIsOpen = true;
  //       this.viewDate = date;
  //       //console.log(new Date());
  //       //console.log(this.viewDate);
  //     }
  //   }
  // }
 count = 0;
 count1=0;
  dayClicked(event) {
 
   this.count=0;
   this.count1=0;
    var dt = new Date(event.date);
    for (let user of this.items) {
      if (moment(dt).isSame(new Date(user.createdAt), 'day') == true) {
        //this.activeDayIsOpen = true;
       this.count++;
        // this.events.push({

        //   start: startOfDay(dt),
        //   title: 'Has custom class',
        // });

      }


    }

    // this.events.push({

    //   start: startOfDay(dt),
    //   title: 'Has custom class',
    // });
    // this.refresh.next();
    //console.log(count);
    // this.events.push({

    //   start: startOfDay(dt),
    //   end: endOfDay(dt),
    //   title: 'Has custom class'+count,
    // });
    // this.refresh.next();
   //console.log(this.events);
  for (let partner of this.partdata) {
    if (moment(dt).isSame(new Date(partner.createdAt), 'day') == true) {
      //this.activeDayIsOpen = true;
     this.count1++;
      // this.events.push({

      //   start: startOfDay(dt),
      //   title: 'Has custom class',
      // });

    }


  }
  this.textmodal=false;

  }
  hidetextmodal()
  {
    this.textmodal=true;
  }

  constructor(private productService: ProductService, private partnerService: PartnerService) { }

  ngOnInit() {

    this.productService.readUsers()
      .subscribe(users => {
        this.users = users['customer'];

        this.items = Object.values(this.users);

        // console.log(this.items);
        this.userkey = Object.keys(this.users);
        // console.log(users);


      });
    this.partnerService.readPartner()
      .subscribe(partners => {
        this.partners = partners['partner'];
        //console.log(this.partners);
        this.partdata = Object.values(this.partners);

        //console.log(this.items);
        this.partnerkey = Object.keys(this.partners);

      });
  }

}
