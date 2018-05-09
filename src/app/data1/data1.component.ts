import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PartnerService } from '../services/partner.service';

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
  providers: [ProductService,PartnerService]
})
export class Data1Component implements OnInit {

  persons: Person[] = [];
  bookings: Booking[] = [];
  bookings_arr: any = {};
  items: any = {};
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

  constructor(private productService: ProductService,private partnerService:PartnerService) {

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
          // alert('loop');
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
