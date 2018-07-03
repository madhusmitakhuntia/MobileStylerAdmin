import { Component, OnInit } from '@angular/core';



import { ProductService } from '../services/product.service';
import { PartnerService } from '../services/partner.service';

import { GoogleChartComponent } from '../google-chart/google-chart.component';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

interface User {
  createdAt: string;
  partnerEmail: string;

}


class Person {

  createdAt: string;
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

@Component({
  selector: 'app-data1',
  templateUrl: './data1.component.html',
  styleUrls: ['./data1.component.css'],

  providers: [ProductService, PartnerService  ]
})
export class Data1Component implements OnInit {


  summery: any = {
    summerydata: ''
  };
  demo = 1;
  textmodal: any = true;
  view: string = 'month';
  persons: Person[] = [];
  bookings: Booking[] = [];
  bookings_arr: any = {};
  items: any = {};
  result: any = {};
  state: any = [];
  jan = 0;
  feb = 0;
  mar = 0;
  apr = 0;
  may = 0;
  jun = 0;
  jul = 0;
  aug = 0;
  sep = 0;
  oct = 0;
  nov = 0;
  dec = 0;

  d1 = 0;
  d2 = 0;
  d3 = 0;
  d4 = 0;
  d5 = 0;
  d6 = 0;
  d7 = 0;

  dp1 = 0;
  dp2 = 0;
  dp3 = 0;
  dp4 = 0;
  dp5 = 0;
  dp6 = 0;
  dp7 = 0;

  id_lastweek = 'WeeklySignUpChart';
  width_lastweek = 600;
  height_lastweek = 400;
  type_lastweek = 'MSColumn2D';
  dataFormat_lastweek = 'json';
  dataSource_lastweek;
  title_lastweek = 'Last Week SignUp';
  summery_lastweek: boolean = true;

  customer_count = 0;
  customer_count1 = 0;
  customer_count2 = 0;
  customer_count3 = 0;

  partner_count = 0;
  partner_count1 = 0;
  partner_count2 = 0;
  partner_count3 = 0;

  dataSource_lastmonth;
  id_month = 'WeeklySignUpChart';
  width_lastmonth = 600;
  height_lastmonth = 400;
  type_lastmonth = 'MSColumn2D';
  dataFormat_lastmonth = 'json';
  title_lastmonth = 'Last 4months SignUp';
  summery_lastmonth: boolean = true;


  haircuts = 0;
  color_services = 0;
  hair_treatments = 0;
  hair_styling = 0;
  manicure = 0;
  pedicure = 0;
  makeup_artist = 0;
  waxing_technician = 0;

  id = 'chart1';
  width = 600;
  height = 400;
  type = 'MSColumn2D';
  dataFormat = 'json';
  dataSource;
  title = 'Angular4 FusionCharts Sample';
  summery_lastyear: boolean = true;

  item_partners: any = {};
  partners: any = {};
  partner_jan = 0;
  partner_feb = 0;
  partner_mar = 0;
  partner_apr = 0;
  partner_may = 0;
  partner_jun = 0;
  partner_jul = 0;
  partner_aug = 0;
  partner_sep = 0;
  partner_oct = 0;
  partner_nov = 0;
  partner_dec = 0;

  id2 = 'chart1';
  width2 = 600;
  height2 = 400;
  type2 = 'column2d';
  dataFormat2 = 'json';
  dataSource2;
  title2 = 'Angular4 FusionCharts Sample';

  width1 = 600;
  height1 = 400;
  type1 = 'pie3d';
  dataFormat1 = 'json';
  dataSource1;

  //map-data
  AL = 0;
  AK = 0;
  AZ = 0;  //--->(1)
  AR = 0;
  CA = 0;
  CO = 0;
  CT = 0;
  DE = 0;
  FL = 0;
  GA = 0;
  HI = 0;
  ID = 0;
  IL = 0;
  IN = 0;
  IA = 0;
  KS = 0;
  KY = 0;
  LA = 0;
  ME = 0;
  MD = 0;  //--->(2)
  MA = 0;
  MI = 0;
  MN = 0;
  MS = 0;
  MO = 0;
  MT = 0;
  NE = 0;
  NV = 0;
  NH = 0;
  NJ = 0;
  NM = 0;
  NY = 0;
  NC = 0;
  ND = 0;
  OH = 0;
  OK = 0;
  OR = 0;
  PA = 0;
  RI = 0;
  SC = 0;
  SD = 0;
  TN = 0;
  TX = 0; //--->(3)
  UT = 0;
  VT = 0;
  VA = 0;
  WA = 0;
  WV = 0;
  WI = 0;
  WY = 0;
  DC = 0;
  AS = 0;
  GU = 0;
  MP = 0;
  PR = 0;
  UM = 0;
  VI = 0;
  US = 0; //--->(4)

  //mapdata partner

  PAL = 0;
  PAK = 0;
  PAZ = 0;  //--->(1)
  PAR = 0;
  PCA = 0;
  PCO = 0;
  PCT = 0;
  PDE = 0;
  PFL = 0;
  PGA = 0;
  PHI = 0;
  PID = 0;
  PIL = 0;
  PIN = 0;
  PIA = 0;
  PKS = 0;
  PKY = 0;
  PLA = 0;
  PME = 0;
  PMD = 0;  //--->(2)
  PMA = 0;
  PMI = 0;
  PMN = 0;
  PMS = 0;
  PMO = 0;
  PMT = 0;
  PNE = 0;
  PNV = 0;
  PNH = 0;
  PNJ = 0;
  PNM = 0;
  PNY = 0;
  PNC = 0;
  PND = 0;
  POH = 0;
  POK = 0;
  POR = 0;
  PPA = 0;
  PRI = 0;
  PSC = 0;
  PSD = 0;
  PTN = 0;
  PTX = 0; //--->(3)
  PUT = 0;
  PVT = 0;
  PVA = 0;
  PWA = 0;
  PWV = 0;
  PWI = 0;
  PWY = 0;
  PDC = 0;
  PAS = 0;
  PGU = 0;
  PMP = 0;
  PPR = 0;
  PUM = 0;
  PVI = 0;
  PUS = 0; //--->(4)

  public map_ChartData;
  public map_ChartOptions;


  constructor(private productService: ProductService, private partnerService: PartnerService, private fb: FormBuilder) {

    this.summery = {
      summerydata: ''
    };
    this.summery = fb.group({
      'summerydata': [null]
    });

  }
  summeryReport(summery) {
    //alert(this.summery.value);
    var data = this.summery.value;
    if (data.summerydata == "Last Month") {
      this.lastMonth();
      //alert("Last Month");
    }
    else if (data.summerydata == "Last week") {
      this.lastWeek();
      //alert("Last week");
    }
    else if (data.summerydata == "Last Year") {
      this.lastYear();
      //alert("Last week");
    }

  }
  lastYear() {
    for (let item of this.items) {
      //alert('loop');
      let date = item.createdAt;
      let newDate = new Date(date);
      switch (newDate.getMonth()) {
        case 0:
          this.jan++;
          break;
        case 1:
          this.feb++;
          break;
        case 2:
          this.mar++;
          break;
        case 3:
          this.apr++;
          break;
        case 4:
          this.may++;
          break;
        case 5:
          this.jun++;
          break;
        case 6:
          this.jul++;
          break;
        case 7:
          this.aug++;
          break;
        case 8:
          this.sep++;
          break;
        case 9:
          this.oct++;
          break;
        case 10:
          this.nov++;
          break;
        case 11:
          this.dec++;
          break;
        // default:
        //   confirm('No data found');

      }


    }
    for (let item of this.item_partners) {
      // alert('loop');
      let date = item.createdAt;
      let newDate = new Date(date);
      //console.log(newDate.getMonth());
      switch (newDate.getMonth()) {
        case 0:
          this.partner_jan++;
          break;
        case 1:
          this.partner_feb++;
          break;
        case 2:
          this.partner_mar++;
          break;
        case 3:
          this.partner_apr++;
          break;
        case 4:
          this.partner_may++;
          break;
        case 5:
          this.partner_jun++;
          break;
        case 6:
          this.partner_jul++;
          break;
        case 7:
          this.partner_aug++;
          break;
        case 8:
          this.partner_sep++;
          break;
        case 9:
          this.partner_oct++;
          break;
        case 10:
          this.partner_nov++;
          break;
        case 11:
          this.partner_dec++;
          break;
        // default:
        //   confirm('No data found');

      }
    }
    this.dataSource = {
      "chart": {
        "caption": "Customer ",
        "subCaption": "No of signup per month",
        // "numberPrefix": "$",
        "theme": "ocean"
      },
      "categories": [{
        "category": [{
          "label": "Jan"
        },
        {
          "label": "Feb"
        },
        {
          "label": "Mar"
        },
        {
          "label": "Apr"
        },
        {
          "label": "May"
        },
        {
          "label": "Jun"
        },
        {
          "label": "Jul"
        },
        {
          "label": "Aug"
        },
        {
          "label": "Sep"
        },
        {
          "label": "Oct"
        },
        {
          "label": "Nov"
        },
        {
          "label": "Dec"
        }
        ]
      }],
      "dataset": [{
        "seriesname": "Client",
        "data": [{
          "value": this.jan
        },
        {
          "value": this.feb
        },
        {
          "value": this.mar
        },
        {
          "value": this.apr
        },
        {
          "value": this.may
        },
        {
          "value": this.jun
        },
        {
          "value": this.jul
        },
        {
          "value": this.aug
        },
        {
          "value": this.sep
        },
        {
          "value": this.oct
        },
        {
          "value": this.nov
        },
        {
          "value": this.dec
        }
        ]
      },
      {
        "seriesname": "Partner",
        "data": [{
          "value": this.partner_jan
        },
        {
          "value": this.partner_feb
        },
        {
          "value": this.partner_mar
        },
        {
          "value": this.partner_apr
        },
        {
          "value": this.partner_may
        },
        {
          "value": this.partner_jun
        },
        {
          "value": this.partner_jul
        },
        {
          "value": this.partner_aug
        },
        {
          "value": this.partner_sep
        },
        {
          "value": this.partner_oct
        },
        {
          "value": this.partner_nov
        },
        {
          "value": this.partner_dec
        },
        {
          "value": this.partner_may
        }
        ]
      }
      ]
    };

    this.summery_lastyear = false;

  }

  lastMonth() {

    var week1 = moment(new Date()).isoWeekday("Monday");
    var week2 = moment(new Date()).isoWeekday("Monday").weekday(-6);
    var week3 = moment(new Date()).isoWeekday("Monday").weekday(-13);
    var week4 = moment(new Date()).isoWeekday("Monday").weekday(-20);
    for (let comp_week of this.items) {

      let date = comp_week.createdAt;
      if (moment(new Date(date)).isSame(week1, 'week') == true) {

        this.customer_count++;
      }
      else if (moment(new Date(date)).isSame(week2, 'week') == true) {

        this.customer_count1++;
      }
      else if (moment(new Date(date)).isSame(week3, 'week') == true) {

        this.customer_count2++;
      }
      else if (moment(new Date(date)).isSame(week4, 'week') == true) {

        this.customer_count3++;
      }
    }
    for (let par_week of this.item_partners) {

      let date = par_week.createdAt;
      if (moment(new Date(date)).isSame(week1, 'week') == true) {

        this.partner_count++;
      }
      else if (moment(new Date(date)).isSame(week2, 'week') == true) {

        this.partner_count1++;
      }
      else if (moment(new Date(date)).isSame(week3, 'week') == true) {

        this.partner_count2++;
      }
      else if (moment(new Date(date)).isSame(week4, 'week') == true) {

        this.partner_count3++;
      }
    }

    // console.log(this.customer_count);
    // console.log(this.customer_count1);
    // console.log(this.customer_count2);
    // console.log(this.customer_count3);
    this.dataSource_lastmonth = {
      "chart": {
        "caption": "Customer ",
        "subCaption": "No of signup in 4weeks",
        // "numberPrefix": "$",
        "theme": "ocean"
      },
      "categories": [{
        "category": [{
          "label": "Week1"
        },
        {
          "label": "Week2"
        },
        {
          "label": "Week3"
        },
        {
          "label": "Week4"
        }
        ]
      }],
      "dataset": [{
        "seriesname": "Client",
        "data": [{
          "value": this.customer_count
        },
        {
          "value": this.customer_count1
        },
        {
          "value": this.customer_count2
        },
        {
          "value": this.customer_count3
        }
        ]
      },
      {
        "seriesname": "Partner",
        "data": [{
          "value": this.partner_count
        },
        {
          "value": this.partner_count1
        },
        {
          "value": this.partner_count2
        },
        {
          "value": this.partner_count3
        }
        ]
      }

      ]
    };
    this.summery_lastmonth = false;

  }
  lastWeek() {


    var d = new Date();
    var v1 = new Date();
    var v2 = d.setDate(d.getDate() - 1);
    var v3 = d.setDate(d.getDate() - 1);
    var v4 = d.setDate(d.getDate() - 1);
    var v5 = d.setDate(d.getDate() - 1);
    var v6 = d.setDate(d.getDate() - 1);
    var v7 = d.setDate(d.getDate() - 1);

    for (let comp_item of this.items) {

      let date = comp_item.createdAt;
      //console.log(date);
      if (moment(new Date(v1)).isSame(new Date(date), 'day') == true) {

        this.d1++;
      }
      else if (moment(new Date(v2)).isSame(new Date(date), 'day') == true) {

        this.d2++;
      }
      else if (moment(new Date(v3)).isSame(new Date(date), 'day') == true) {

        this.d3++;
      }
      else if (moment(new Date(v4)).isSame(new Date(date), 'day') == true) {

        this.d4++;
      }
      else if (moment(new Date(v5)).isSame(new Date(date), 'day') == true) {

        this.d5++;
      }
      else if (moment(new Date(v6)).isSame(new Date(date), 'day') == true) {

        this.d6++;
      }
      else if (moment(new Date(v7)).isSame(new Date(date), 'day') == true) {

        this.d7++;
      }

    }

    for (let comp_item of this.item_partners) {

      let date = comp_item.createdAt;
      //console.log(date);
      if (moment(new Date(v1)).isSame(new Date(date), 'day') == true) {

        this.dp1++;
      }
      else if (moment(new Date(v2)).isSame(new Date(date), 'day') == true) {

        this.dp2++;
      }
      else if (moment(new Date(v3)).isSame(new Date(date), 'day') == true) {

        this.dp3++;
      }
      else if (moment(new Date(v4)).isSame(new Date(date), 'day') == true) {

        this.dp4++;
      }
      else if (moment(new Date(v5)).isSame(new Date(date), 'day') == true) {

        this.dp5++;
      }
      else if (moment(new Date(v6)).isSame(new Date(date), 'day') == true) {

        this.dp6++;
      }
      else if (moment(new Date(v7)).isSame(new Date(date), 'day') == true) {

        this.dp7++;
      }

    }

    this.dataSource_lastweek = {
      "chart": {
        "caption": "Customer ",
        "subCaption": "No of signup in last week",
        // "numberPrefix": "$",
        "theme": "ocean"
      },
      "categories": [{
        "category": [{
          "label": moment(v1).format('LL')
        },
        {
          "label": moment(v2).format('LL')
        },
        {
          "label": moment(v3).format('LL')
        },
        {
          "label": moment(v4).format('LL')
        },
        {
          "label": moment(v5).format('LL')
        },
        {
          "label": moment(v6).format('LL')
        },
        {
          "label": moment(v7).format('LL')
        }
        ]
      }],
      "dataset": [{
        "seriesname": "Client",
        "data": [{
          "value": this.d1
        },
        {
          "value": this.d2
        },
        {
          "value": this.d3
        },
        {
          "value": this.d4
        },
        {
          "value": this.d5
        },
        {
          "value": this.d6
        },
        {
          "value": this.d7
        }

        ]
      },
      {
        "seriesname": "Partner",
        "data": [{
          "value": this.dp1
        },
        {
          "value": this.dp2
        },
        {
          "value": this.dp3
        },
        {
          "value": this.dp4
        },
        {
          "value": this.dp5
        },
        {
          "value": this.dp6
        },
        {
          "value": this.dp7
        }
        ]
      }
      ]
    };


    this.summery_lastweek = false;


  }



  ngOnInit() {
    //this.demo=2;
    console.log(this.demo++);
    this.productService.readUsers()
      .subscribe(persons => {
        this.persons = persons['customer'];
        //console.log(persons);
        this.items = Object.values(this.persons);
        // this.items1 = Object.values(this.items);

        //console.log(this.items[0].createdAt);

        // console.log(Object.values(this.items).length);
        // this.foundBooks = Array.of(this.foundBooks);

        //console.log(this.persons);
        // alert(this.persons);
        for (let item of this.items) {
          //alert('loop');
          let date = item.createdAt;
          let newDate = new Date(date);
          //console.log(newDate.getMonth());

          if (item.addresses !== undefined) {
            const state = item.addresses[0].state;
            // console.log( state);
            switch (state) {
              case 'AZ':
                this.AZ++;
                break;
              case 'AL':
                this.AL++;
                break;
              case 'AK':
                this.AK++;
                break;
              case 'AZ':
                this.AZ++;
                break;
              case 'AR':
                this.AR++;
                break;
              case 'CA':
                this.CA++;
                break;
              case 'CO':
                this.CO++;
                break;
              case 'CT':
                this.CT++;
                break;
              case 'DE':
                this.DE++;
                break;
              case 'FL':
                this.FL++;
                break;
              case 'GA':
                this.GA++;
                break;
              case 'HI':
                this.HI++;
                break;
              case 'ID':
                this.ID++;
                break;
              case 'IL':
                this.IL++;
                break;
              case 'IN':
                this.IN++;
                break;
              case 'IA':
                this.IA++;
                break;
              case 'KS':
                this.KS++;
                break;
              case 'KY':
                this.KY++;
                break;
              case 'LA':
                this.LA++;
                break;
              case 'ME':
                this.ME++;
                break;
              case 'MD':
                this.MD++;
                break;

              case 'MA':
                this.MA++;
                break;
              case 'MI':
                this.MI++;
                break;
              case 'MN':
                this.MN++;
                break;
              case 'MS':
                this.MS++;
                break;
              case 'MO':
                this.MO++;
                break;
              case 'MT':
                this.MT++;
                break;
              case 'NE':
                this.NE++;
                break;
              case 'NV':
                this.NV++;
                break;
              case 'NH':
                this.NH++;
                break;
              case 'NJ':
                this.NJ++;
                break;
              case 'NM':
                this.NM++;
                break;
              case 'NY':
                this.NY++;
                break;
              case 'NC':
                this.NC++;
                break;
              case 'ND':
                this.ND++;
                break;
              case 'OH':
                this.OH++;
                break;
              case 'OK':
                this.OK++;
                break;
              case 'OR':
                this.OR++;
                break;
              case 'PA':
                this.PA++;
                break;
              case 'RI':
                this.RI++;
                break;
              case 'SC':
                this.SC++;
                break;
              case 'SD':
                this.SD++;
                break;
              case 'TN':
                this.TN++;
                break;
              case 'TX':
                this.TX++;
                break;

              case 'UT':
                this.UT++;
                break;
              case 'VT':
                this.VT++;
                break;
              case 'VA':
                this.VA++;
                break;
              case 'WA':
                this.WA++;
                break;
              case 'WV':
                this.WV++;
                break;
              case 'WI':
                this.WI++;
                break;
              case 'WY':
                this.WY++;
                break;
              case 'DC':
                this.DC++;
                break;
              case 'AS':
                this.AS++;
                break;
              case 'GU':
                this.GU++;
                break;
              case 'MP':
                this.MP++;
                break;
              case 'PR':
                this.PR++;
                break;
              case 'UM':
                this.UM++;
                break;
              case 'VI':
                this.VI++;
                break;
              case 'US':
                this.US++;
                break;


            }

          }

        }
        //console.log('mar' + this.mar);
        //console.log('apr' + this.apr);
        //   width = 600;
        //   height = 400;
        //   type = 'column2d';
        //   dataFormat = 'json';

        this.partnerService.readPartner()
          .subscribe(partners => {
            this.partners = partners['partner'];
            //console.log(partners);
            this.item_partners = Object.values(this.partners);
            // this.items1 = Object.values(this.items);

            //console.log(this.item_partners[0].createdAt);

            // console.log(Object.values(this.items).length);
            // this.foundBooks = Array.of(this.foundBooks);

            // console.log(this.partners);
            // alert(this.persons);
            for (let item of this.item_partners) {
              // alert('loop');
              let date = item.createdAt;
              let newDate = new Date(date);
              //console.log(newDate.getMonth());
              switch (newDate.getMonth()) {
                case 0:
                  this.partner_jan++;
                  break;
                case 1:
                  this.partner_feb++;
                  break;
                case 2:
                  this.partner_mar++;
                  break;
                case 3:
                  this.partner_apr++;
                  break;
                case 4:
                  this.partner_may++;
                  break;
                case 5:
                  this.partner_jun++;
                  break;
                case 6:
                  this.partner_jul++;
                  break;
                case 7:
                  this.partner_aug++;
                  break;
                case 8:
                  this.partner_sep++;
                  break;
                case 9:
                  this.partner_oct++;
                  break;
                case 10:
                  this.partner_nov++;
                  break;
                case 11:
                  this.partner_dec++;
                  break;
                // default:
                //   confirm('No data found');

              }
              if (item.addresses !== undefined) {
                const state = item.addresses[0].state;
                // console.log( state);
                switch (state) {
                  case 'AZ':
                    this.PAZ++;
                    break;
                  case 'AL':
                    this.PAL++;
                    break;
                  case 'AK':
                    this.PAK++;
                    break;
                  case 'AZ':
                    this.PAZ++;
                    break;
                  case 'AR':
                    this.PAR++;
                    break;
                  case 'CA':
                    this.PCA++;
                    break;
                  case 'CO':
                    this.PCO++;
                    break;
                  case 'CT':
                    this.PCT++;
                    break;
                  case 'DE':
                    this.PDE++;
                    break;
                  case 'FL':
                    this.PFL++;
                    break;
                  case 'GA':
                    this.PGA++;
                    break;
                  case 'HI':
                    this.PHI++;
                    break;
                  case 'ID':
                    this.PID++;
                    break;
                  case 'IL':
                    this.PIL++;
                    break;
                  case 'IN':
                    this.PIN++;
                    break;
                  case 'IA':
                    this.PIA++;
                    break;
                  case 'KS':
                    this.PKS++;
                    break;
                  case 'KY':
                    this.PKY++;
                    break;
                  case 'LA':
                    this.PLA++;
                    break;
                  case 'ME':
                    this.PME++;
                    break;
                  case 'MD':
                    this.PMD++;
                    break;

                  case 'MA':
                    this.PMA++;
                    break;
                  case 'MI':
                    this.PMI++;
                    break;
                  case 'MN':
                    this.PMN++;
                    break;
                  case 'MS':
                    this.PMS++;
                    break;
                  case 'MO':
                    this.PMO++;
                    break;
                  case 'MT':
                    this.PMT++;
                    break;
                  case 'NE':
                    this.PNE++;
                    break;
                  case 'NV':
                    this.PNV++;
                    break;
                  case 'NH':
                    this.PNH++;
                    break;
                  case 'NJ':
                    this.PNJ++;
                    break;
                  case 'NM':
                    this.PNM++;
                    break;
                  case 'NY':
                    this.PNY++;
                    break;
                  case 'NC':
                    this.PNC++;
                    break;
                  case 'ND':
                    this.PND++;
                    break;
                  case 'OH':
                    this.POH++;
                    break;
                  case 'OK':
                    this.POK++;
                    break;
                  case 'OR':
                    this.POR++;
                    break;
                  case 'PA':
                    this.PPA++;
                    break;
                  case 'RI':
                    this.PRI++;
                    break;
                  case 'SC':
                    this.PSC++;
                    break;
                  case 'SD':
                    this.PSD++;
                    break;
                  case 'TN':
                    this.PTN++;
                    break;
                  case 'TX':
                    this.PTX++;
                    break;

                  case 'UT':
                    this.PUT++;
                    break;
                  case 'VT':
                    this.PVT++;
                    break;
                  case 'VA':
                    this.PVA++;
                    break;
                  case 'WA':
                    this.PWA++;
                    break;
                  case 'WV':
                    this.PWV++;
                    break;
                  case 'WI':
                    this.PWI++;
                    break;
                  case 'WY':
                    this.PWY++;
                    break;
                  case 'DC':
                    this.PDC++;
                    break;
                  case 'AS':
                    this.PAS++;
                    break;
                  case 'GU':
                    this.PGU++;
                    break;
                  case 'MP':
                    this.PMP++;
                    break;
                  case 'PR':
                    this.PPR++;
                    break;
                  case 'UM':
                    this.PUM++;
                    break;
                  case 'VI':
                    this.PVI++;
                    break;
                  case 'US':
                    this.PUS++;
                    break;


                }

              }

            }
            //console.log('marpar' + this.partner_mar);
            //console.log('aprpar' + this.partner_apr);
            //   width = 600;
            //   height = 400;
            //   type = 'column2d';
            //   dataFormat = 'json';
            this.dataSource2 = {
              "chart": {
                "caption": "Partner ",
                "subCaption": "No of signup per month",
                // "numberPrefix": "$",
                "theme": "ocean"
              },
              "data": [
                {
                  "label": "January",
                  "value": this.partner_jan
                },
                {
                  "label": "February",
                  "value": this.partner_feb
                },
                {
                  "label": "Mar",
                  "value": this.partner_mar
                },
                {
                  "label": "Apr",
                  "value": this.partner_apr
                },
                {
                  "label": "May",
                  "value": this.partner_may
                }
              ]
            };

            console.log('pMD--->' + this.MD);
            console.log('pAZ--->' + this.AZ);
            console.log('pUS--->' + this.US);
            console.log('pTX--->' + this.TX);
            console.log('pAZ222--->' + this.AZ);
            this.map_ChartData = [
              ['State', 'Users', 'Partners'],
              ['US-AL', this.AL, this.PAL],
              ['US-AK', this.AK, this.PAK],
              ['US-AZ', this.AZ, this.PAZ],
              ['US-AR', this.AR, this.PAR],
              ['US-CA', this.CA, this.PCA],
              ['US-CO', this.CO, this.PCO],
              ['US-CT', this.CT, this.PCT],
              ['US-DE', this.DE, this.PDE],
              ['US-DC', this.DC, this.PDC],
              ['US-FL', this.FL, this.PFL],
              ['US-GA', this.GA, this.PGA],
              ['US-HI', this.HI, this.PHI],
              ['US-ID', this.ID, this.PID],
              ['US-IL', this.IL, this.PIL],
              ['US-IN', this.IN, this.PIN],
              ['US-IA', this.IA, this.PIA],
              ['US-KS', this.KS, this.PKS],
              ['US-KY', this.KY, this.PKY],
              ['US-LA', this.LA, this.PLA],
              ['US-ME', this.ME, this.PME],
              ['US-MT', this.MT, this.PMT],
              ['US-NE', this.NE, this.PNE],
              ['US-NV', this.NV, this.PNV],
              ['US-NH', this.NH, this.PNH],
              ['US-NJ', this.NJ, this.PNJ],
              ['US-NM', this.NM, this.PNM],
              ['US-NY', this.NY, this.PNY],
              ['US-NC', this.NC, this.PNC],
              ['US-ND', this.ND, this.PND],
              ['US-OH', this.OH, this.POH],
              ['US-OK', this.OK, this.POK],
              ['US-OR', this.OR, this.POR],
              ['US-MD', this.MD, this.PMD],
              ['US-MA', this.MA, this.PMA],
              ['US-MI', this.MI, this.PMI],
              ['US-MN', this.MN, this.PMN],
              ['US-MS', this.MS, this.PMS],
              ['US-MO', this.MO, this.PMO],
              ['US-PA', this.PA, this.PPA],
              ['US-RI', this.RI, this.PRI],
              ['US-SC', this.SC, this.PSC],
              ['US-SD', this.SD, this.PSD],
              ['US-TN', this.TN, this.PTN],
              ['US-TX', this.TX, this.PTX],
              ['US-UT', this.UT, this.PUT],
              ['US-VT', this.VT, this.PVT],
              ['US-VA', this.VA, this.PVA],
              ['US-WA', this.WA, this.PWA],
              ['US-WV', this.WV, this.PWV],
              ['US-WI', this.WI, this.PWI],
              ['US-WY', this.WY, this.PWY]
            ];
            this.map_ChartOptions = {
              title: 'Customer Sign ups based on states',
              region: 'US', // Africa
              colorAxis: { colors: ['#ffffff', '#3366cc', '#990099'] },
              backgroundColor: '#81d4fa',
              datalessRegionColor: '#f8bbd0',
              defaultColor: '#f5f5f5',
              resolution: 'provinces',
              // dataMode: 'markers',
              // displayMode: 'markers',
              magnifyingGlass: { enable: true, zoomFactor: 5.0 },
              legend: { textStyle: { color: 'blue', fontSize: 16 } }
            };

          });




      });

    this.productService.readBookings()
      .subscribe(bookings => {
        this.bookings = bookings['bookings'];
        //console.log(bookings);
        this.bookings_arr = Object.values(this.bookings);
        // this.items1 = Object.values(this.items);



        // console.log(Object.values(this.items).length);
        // this.foundBooks = Array.of(this.foundBooks);

        //console.log(this.bookings);
        //console.log(this.items);
        //console.log(this.bookings_arr[0].services[0]);
        for (let item of this.bookings_arr) {
          // alert('loop');
          let data = item.services[0].serviceName;

          //console.log(data);
          switch (data) {
            case "Haircuts":
              this.haircuts++;
              break;
            case "Color Services":
              this.color_services++;
              break;
            case "Hair Treatments":
              this.hair_treatments++;
              break;
            case "Hair Styling":
              this.hair_styling++;
              break;
            case "Manicure":
              this.manicure++;
              break;
            case "Pedicure":
              this.pedicure++;
              break;
            case "Makeup Artist":
              this.makeup_artist++;
              break;
            case "Waxing Technician":
              this.waxing_technician++;
              break;

            // default:
            //   confirm('No data found');

          }
        }
        //console.log('Haircut' + this.haircuts);
        //console.log('Hair Tre' + this.hair_treatments);
        // alert(this.persons);


        this.dataSource1 = {
          "chart": {
            "caption": "Services In mobile styler",
            //"subcaption": "Ser]",
            "startingangle": "120",
            "showlabels": "0",
            "showlegend": "1",
            "enablemultislicing": "0",
            "slicingdistance": "15",
            "showpercentvalues": "1",
            "showpercentintooltip": "0",
            "plottooltext": "Service : $label Total visit : $datavalue",
            "theme": "ocean"
          },
          "data": [
            {
              "label": "haircuts",
              "value": this.haircuts
            },
            {
              "label": "color_services",
              "value": this.color_services
            },
            {
              "label": "hair_treatments",
              "value": this.hair_treatments
            },
            {
              "label": "manicure",
              "value": this.manicure
            },
            {
              "label": "pedicure",
              "value": this.pedicure
            },
            {
              "label": "makeup_artist",
              "value": this.makeup_artist
            },
            {
              "label": "waxing_technician",
              "value": this.waxing_technician
            },
            {
              "label": "hair_styling",
              "value": this.hair_styling
            }
          ]
        };

      });



  }
  parentMessage = "message from parent in child";
  mess = "asdfasdf";

}
