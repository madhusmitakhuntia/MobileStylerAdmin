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

  providers: [ProductService, PartnerService,

  ]
})
export class Data1Component implements OnInit {


  summery: any = {
    summerydata: ''
  };

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
  id_lastweek = 'WeeklySignUpChart';
  width_lastweek = 600;
  height_lastweek = 400;
  type_lastweek = 'column2d';
  dataFormat_lastweek = 'json';
  dataSource_lastweek;
  title_lastweek = 'Last Week SignUp';
  summery_lastweek: boolean = true;

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
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Angular4 FusionCharts Sample';

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

  }
  lastMonth() {

  }
  lastWeek() {
  

    var d = new Date("04-26-2018");
    var v1 = d.setDate(d.getDate() - 1);
    var v2 = d.setDate(d.getDate() - 2);
    var v3 = d.setDate(d.getDate() - 3);
    var v4 = d.setDate(d.getDate() - 4);
    var v5 = d.setDate(d.getDate() - 5);
    var v6 = d.setDate(d.getDate() - 6);
    var v7 = d.setDate(d.getDate() - 7);
    //     //result.push( d );
    //console.log(d);
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
    console.log(v1);
    this.dataSource_lastweek = {
      "chart": {
        "caption": "Customer ",
        "subCaption": "No of signup in last week",
        // "numberPrefix": "$",
        "theme": "ocean"
      },
      "data": [
        {
          "label":new Date(v1),
          "value": this.d1
        },
        {
          "label": new Date(v2),
          "value": this.d2
        },
        {
          "label":new Date(v3),
          "value": this.d3
        },
        {
          "label": new Date(v4),
          "value": this.d4
        },
        {
          "label": new Date(v5),
          "value": this.d5
        },
        {
          "label": new Date(v6),
          "value": this.d6
        },
        {
          "label":new Date( v7),
          "value": this.d7
        }
      ]
    };


    this.summery_lastweek = false;


  }


  ngOnInit() {
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
        this.dataSource = {
          "chart": {
            "caption": "Customer ",
            "subCaption": "No of signup per month",
            // "numberPrefix": "$",
            "theme": "ocean"
          },
          "data": [
            {
              "label": "January",
              "value": this.jan
            },
            {
              "label": "February",
              "value": this.feb
            },
            {
              "label": "Mar",
              "value": this.mar
            },
            {
              "label": "Apr",
              "value": this.apr
            },
            {
              "label": "May",
              "value": this.may
            }
          ]
        };

        console.log('MD--->' + this.MD);
        console.log('AZ--->' + this.AZ);
        console.log('US--->' + this.US);
        console.log('TX--->' + this.TX);
        console.log('AZ222--->' + this.AZ);
        this.map_ChartData = [
          ['State', 'Users', 'Partners'],
          ['US-AL', 1, 12],
          ['US-AK', 2, 1],
          ['US-AZ', this.AZ, 16],
          ['US-AR', 23, 2],
          ['US-CA', 1, 3],
          ['US-CO', 0, 4],
          ['US-CT', 0, 2],
          ['US-DE', 7, 1],
          ['US-DC', 4, 2],
          ['US-FL', 0, 5],
          ['US-GA', 0, 6],
          ['US-HI', 0, 7],
          ['US-ID', 9, 2],
          ['US-IL', 0, 6],
          ['US-IN', 3, 3],
          ['US-IA', 1, 7],
          ['US-KS', 0, 8],
          ['US-KY', 0, 1],
          ['US-LA', 0, 0],
          ['US-ME', 9, 2],
          ['US-MT', 8, 3],
          ['US-NE', 12, 3],
          ['US-NV', 11, 4],
          ['US-NH', 0, 11],
          ['US-NJ', 0, 2],
          ['US-NM', 0, 3],
          ['US-NY', 0, 0],
          ['US-NC', 0, 0],
          ['US-ND', 0, 0],
          ['US-OH', 0, 0],
          ['US-OK', 0, 0],
          ['US-OR', 0, 0],
          ['US-MD', 1, 0],
          ['US-MA', 2, 0],
          ['US-MI', 1, 0],
          ['US-MN', 1, 0],
          ['US-MS', 1, 0],
          ['US-MO', 2, 0],
          ['US-PA', 3, 0],
          ['US-RI', 1, 0],
          ['US-SC', 0, 0],
          ['US-SD', 0, 0],
          ['US-TN', 1, 0],
          ['US-TX', this.TX, 0],
          ['US-UT', 1, 0],
          ['US-VT', 0, 0],
          ['US-VA', 0, 0],
          ['US-WA', 0, 0],
          ['US-WV', 0, 0],
          ['US-WI', 0, 0],
          ['US-WY', 0, 0]
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
            "subcaption": "Ser]",
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




      });
  }

}
