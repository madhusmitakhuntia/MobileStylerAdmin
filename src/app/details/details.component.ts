import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {BookingsService} from "../services/bookings.service";
import {ProfileService} from "../services/profile.service";
import {AuthService} from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { } from 'googlemaps';
import { ServicesService } from '../services/services.service';
import {Router} from '@angular/router';
import { MapsAPILoader } from '@agm/core';


declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  /* get map screen height*/
  @ViewChild('mainScreen') elementView: ElementRef;
  viewHeight: number;
  /* end refrencing map div*/

  map: any;
  marker: any;
error;
zoom;
  current_icon='assets/map-icon.png';
  items: any;
  bookDiv: boolean;
  bookPage: boolean;
  listPage: boolean;
  locationPage: boolean;
  lat: number = 51.678418;
  lng: number = 7.809007;
  services: any;
  arrow_flag: number;

  /*segment radio button default options*/
  gender: any = 'male';
  distance: any = '5';
  price: any = 'high';
  rating: any = 'high';

  /*location variables*/
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any = [];
  nearbyItems: any = new Array<any>();
  loading: any=true;
  /* end of location variables */

  /*to handle dropdown data*/
  category_data: any = [];
  sub_category_data: any = {}; // all sub categories structure
  sub_categories = []; // filtered sub categories based on category selection

  header_address: string = 'fetching address';
  xyz: string = "fetching";
  current_location: any;

  showCard: boolean = true;

  added_services: any = []; //for listing selected services in booking popup
  /*model data for selected service data */
  details: any = {
    service: '',
    price: '',
    expertise: '',
    category: ''
  };

  selected_services = [];

  /* card top profile information*/
  profile_data = {
    'profilePicture': '',
    'puid': '',
    'name': ''
  };

  customerName: any = '';

  addresses = []; // addresses in customer profile data

  amount: number = 0; // to caluclate total amount client to pay for selected services
  selected_name: any = "";


  markers = [];

  all_services = [];


  constructor( public serviceDB: ServicesService,
    public profileService: ProfileService,
    public zone: NgZone,
    public router:Router,
    public bookingService: BookingsService) { 
      this.arrow_flag = 0;
    this.bookDiv = true;
    this.bookPage = true;
    this.locationPage = true;
    this.listPage = false;
    this.autocomplete = {
      input: ''
    };
    this.profileService.getProfileData(localStorage.getItem('uid'))
      .subscribe(
      
      ref => this.loadMyAddress(ref[0])
      );


    this.xyz = "fetching adress..";

    this.services = [
      {
        "name": "Haircuts",
        "children": [
          {
            "name": "Men's Haircut"
          },
          {
            "name": "Men's Barber"
          },
          {
            "name": "Women's Haircut"
          }
        ]
      },
      {
        "name": "Color Services",
        "children": [
          {
            "name": "Retouch"
          },
          {
            "name": "Highlights/Balayage"
          },
          {
            "name": "Ombre"
          },
          {
            "name": "All over coloring "
          },
          {
            "name": "Color Correction "
          }
        ]
      },
      {
        "name": "Hair Treatments",
        "children": [
          {
            "name": "Deep Conditioning"
          },
          {
            "name": "Brazilian Blowout"
          },
          {
            "name": "Keratin"
          },
          {
            "name": "Perms"
          }
        ]
      },
      {
        "name": "Hair Styling",
        "children": [
          {
            "name": "Blow outs"
          },
          {
            "name": "Up/Down Dos"
          },
          {
            "name": "Hair Extensions "
          }
        ]
      },
      {
        "name": "Hands",
        "children": [
          {
            "name": "Manicure"
          },
          {
            "name": "Acrylic"
          },
          {
            "name": "Dip Powder"
          },
          {
            "name": "Gel"
          }
        ]
      },
      {
        "name": "Feet",
        "children": [
          {
            "name": "Basic Pedicure"
          },
          {
            "name": "Spa Pedicure"
          }
        ]
      },
      {
        "name": "Makeup Artist",
        "children": [
          {
            "name": "Special Occasion"
          },
          {
            "name": "Bridal"
          }
        ]
      },
      {
        "name": "Waxing Technician",
        "children": [
          {
            "name": "Facial"
          },
          {
            "name": "Arms"
          },
          {
            "name": "Legs"
          },
          {
            "name": "Brazilian"
          },
          {
            "name": "Back"
          }
        ]
      }
    ];

    this.items = this.services;

    this.current_location = {};
    this.current_location.latitude = "";
    this.current_location.longitude = "";
    this.current_location.address = "";

    var self = this;

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position)
     /* if(position){
        this.lat = position.coords.latitude;
      this.lng= position.coords.longitude;
      }*/
      

      /*this.GetAddress({ lat: position.coords.latitude, lng: position.coords.longitude }, function (data) {
        self.loading.dismiss();
        if (data) {
          self.current_location.address = data;
        } else {
          console.log('Google api failed to get the formatted address');
        }
      });

      console.log(position.coords.latitude, position.coords.longitude)
      let latLng = new google.maps.LatLng(this.lat,this.lng);
      let mapOptions = {  
       // center: latLng,
       center:new google.maps.LatLng(51.508742,-0.120850),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      this.marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        icon: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png'
      });

      this.map.setCenter(latLng);
      this.marker.setPosition(latLng);
    }, (err) => {
      console.log(err);
      this.GetLatlong('Austin, TX, USA');*/
    });

    this.setCurrentPosition();
    }

    private setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom=this.getZoomLevel(5);
          this.GetAddress({ lat: position.coords.latitude, lng: position.coords.longitude }, function (data) {
            if (data) {
              //this.current_location.address = data;
            } else {
              console.log('Google api failed to get the formatted address');
            }
          });
        });
      }
    }

    loadMyAddress(data) {
      console.log(data)
      this.addresses = data.addresses;
      this.customerName = data.name;
    }
  
    addService() {
      let json = {
        'serviceName': this.details.category,
        'price': this.details.price,
        'speciality': this.sub_categories[this.details.speciality].name
      };
      this.amount += this.details.price;
      this.added_services.push(json);
      console.log(this.added_services)
    }

    hideDetails(){
      this.bookPage=true;
    }
  
    /* to remove selected service from added services list in booking popup*/
    removeService(index) {
      this.amount=0;
      console.log(index)
      this.added_services.splice(index,1);
      for (let j = 0; j < this.added_services.length; j++) {
          this.amount += this.added_services[j].price;
       
      }
  
      console.log(this.added_services)
    }
  
  
    updateSearchResults() {
      if (this.autocomplete.input == '') {
        this.autocompleteItems = [];
        return;
      }
  
      this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
        (predictions, status) => {
          this.autocompleteItems = [];
          if (predictions) {
            this.autocompleteItems = predictions;
          }
        });
    }
  
    updateMapWithCurrentLocation(latitude, longitude) {
     /* let latLng = new google.maps.LatLng(latitude, longitude);
      if (this.marker) {
        this.marker.position = latLng;
        this.map.setCenter(latLng);
        this.marker.setPosition(latLng);
      } else {
        let latLng = new google.maps.LatLng(latitude, longitude);
        let mapOptions = {
          center: latLng,
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
        this.marker = new google.maps.Marker({
          map: this.map,
          position: latLng,
          icon: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png'
        });
  
        this.map.setCenter(latLng);
        this.marker.setPosition(latLng);
        this.loading.dismiss();
      }
  
      this.autocompleteItems = [];
      this.autocomplete.input = '';*/
    }
  
    GetLatlong(address) {
      var geocoder = new google.maps.Geocoder();
      var address = address;
      var self = this;
  
      geocoder.geocode({ 'address': address }, function (results, status) {
        // console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          self.current_location.latitude = latitude;
          self.current_location.longitude = longitude;
          self.current_location.address = results[0].formatted_address;
          self.updateMapWithCurrentLocation(latitude, longitude);
          self.locationPage = true;
          self.listPage = false;
          // console.log(latitude)
          // console.log(longitude)
        }
      });
    }
  
    GetAddress(latlng, callback) {
      var geocoder = new google.maps.Geocoder();
      var address = address;
  
      geocoder.geocode({ 'location': latlng }, function (results, status) {
        console.log(results);
        if (results.length > 0) {
          callback(results[0].formatted_address);
        }
      });
    }
  
  
    itemArrow(item, index) {
      if (this.arrow_flag) {
        console.log(item)
        this.selected_name = item.name;
       // this.clearMarkers();
        this.addMarkersToMap();
      } else {
        this.arrow_flag = 1;
        this.items = this.services[index].children;
      }
    }
  
    changeGender() {
      let list = [];
      this.all_services.forEach(element => {
        if(this.gender == element.partnerGender){
          list.push(element);
        }
      });
      this.all_services = list;
      this.clearMarkers();
      this.addMarkersToMap();
    }
  
    changeDistance() {
      this.addMarkersToMap();
    }
  
    changeRating() {
      this.addMarkersToMap();
    }
  
    changePrice() {
      this.addMarkersToMap();
    }
  
    backToMain() {
      this.items = this.services;
      this.arrow_flag = 0;
      this.showCard = true;
      this.clearMarkers();
    }

  ngOnInit() {
    this.viewHeight = this.elementView.nativeElement.offsetHeight;
    this.viewHeight=this.viewHeight-110;
    /*this.geocoder = new google.maps.Geocoder;
    this.GooglePlaces = new google.maps.places.PlacesService(this.mapElement.nativeElement);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };*/
    this.autocompleteItems = [];
  }

  testMarker(marker,content,index){
    this.showBookingDiv(marker,content,index);
  }

  showBookDiv() {
    if (this.bookDiv) {
      this.bookDiv = false;
    } else {
      this.bookDiv = true;
    }
  }

  showLocationPage() {

    if (this.locationPage) {
      this.listPage = true;
      this.locationPage = false;
    } else {
      this.bookPage = true;
      this.listPage = false;
      this.locationPage = true;
    }

  }

  getSubCategories(service) {

    this.sub_categories = this.sub_category_data[this.details.category];
  }

  getAmount(data) {
    this.selected_services.push(this.sub_categories[data]);
    console.log(this.sub_categories[data].price)
    this.details.price = this.sub_categories[data].price;

    console.log(this.selected_services)
  }

  ArrNoDupe(a) {

    return a;
  }

  /*get cateogry and sub cateogries of partner */
  getServices(services) {
    console.log(services);
    console.log(services.length)
    for (let i = 0; i < services.length; i++) {
      if (services[i].service) {
        if (this.category_data.indexOf(services[i].service))
          this.category_data.push(services[i].service);

        if (this.sub_category_data[services[i].service]) {
          this.sub_category_data[services[i].service].push({
            "name": services[i].speciality,
            "price": services[i].amount
          })
        } else {
          this.sub_category_data[services[i].service] = [];
          this.sub_category_data[services[i].service].push({
            "name": services[i].speciality,
            "price": services[i].amount
          })
        }
      }


      console.log(this.sub_category_data)
    }
  }

  /*function to get selected partner id and get information on to booking card*/
  showBookPage(puid) {
    console.log(puid)
    this.serviceDB.getAllPartnerServices(puid)
      .subscribe(ref => this.getServices(ref));

    if (this.bookPage) {
      this.bookPage = false;
      this.listPage = true;
    } else {
      this.bookPage = true;
      this.listPage = false;
    }
  }

  setHeaderAddress(address) {
    this.header_address = address.locality + ',' + address.countryCode;
  }

  addMarkersToMap() {
    alert('called')
   // this.map.setZoom(this.getZoomLevel(this.distance));
    this.loading=false;
    alert(this.selected_name)
    let services = this.serviceDB.getAllServicesByName(this.selected_name).map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    console.log(services)
    services.subscribe(ref => this.checkList(ref));
    this.loading=true;
  }

  checkGender(data) {
    if(this.gender == data.partnerGender){
      return true;
    } else {
      return false;
    }
  }

  checkDistance(data) {
    return true;
  }

  checkRating(data) {
    return true;
  }

  checkPrice(data) {
    return true;
  }


  checkList(data) {
    alert(data)
    for (let service of data) {
      if (this.checkGender(service)) { //&& this.checkDistance(service) && this.checkRating(service)) {
        this.all_services.push(service);
        this.addMarker(service.location.lat, service.location.lng, service.key)
      }
    }
    console.log(this.all_services);
  }

  addToList(latitude, longitude, key) {
    console.log(latitude, longitude, key)
    let data = this.serviceDB.getAllServices(key);

    data.subscribe(item => this.addMarker(latitude, longitude, key));
  }

  getZoomLevel(radius) {
    return Math.round(14 - Math.log(radius) / Math.LN2);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  addMarker(lat, lng, content) {
    if (lat && lng && content) {
      let latLng = new google.maps.LatLng(lat, lng);
      let marker = new google.maps.Marker({
        map: this.map,
        position: latLng
      });
      this.markers.push({lat:lat,lng:lng,marker:marker,content:content,icon:'http://maps.google.com/mapfiles/ms/icons/orange.png'});
      console.log('markers')
      console.log(this.markers)
      //google.maps.event.addListener(marker, 'click', ((data) => this.showBookingDiv(marker, content)))

    }

  }

  showBookingDiv(marker, content,index) {
    this.loading=false;
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].icon='http://maps.google.com/mapfiles/ms/icons/orange.png';
    }
    this.markers[index].icon='http://maps.google.com/mapfiles/ms/icons/green.png';
    
    
    console.log("marker triggered");
    let data = this.serviceDB.getAllServices(content);

    data.subscribe(item => this.showPartnerCard(item));

  }

  showPartnerCard(data) {
    console.log(data)
    console.log(data[0]);
    this.profile_data = data;
    this.showCard = false;

    this.loading=true;
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
  book() {
    if (localStorage.getItem('uid') === null) {
     this.router.navigateByUrl('');
    } else
      if (localStorage.getItem('uid')) {
        this.details.amount = this.amount;
        this.details.selectedServices = this.added_services;

        var json = {
          bookingSchedule: {
            date: this.details.myDate,
            time: this.details.myTime
          },
          customerAddress: this.addresses[this.details.address],
          customerId: localStorage.getItem('uid'),
          createdAt: new Date().toISOString(),
          partnerId: this.profile_data.puid,
          services: this.added_services,
          stage: 'pending',
          totalAmount: this.amount,
          customerName: this.customerName,
          notes: this.details.notes
        }
        console.log(json)
        let arrayOfKeys = Object.keys(json);
        let error = false;

        for (let obj of arrayOfKeys) {
          if (obj == 'address2' || obj == 'geofire' || obj == 'status') { }
          else
            if (!(json[obj]) || json[obj] == "") {
              error = true;
              this.loadError("please provide valid " + obj);
              break;
            }
        }
        if (!error) {
          this.bookingService.storeBooking(json);
        }

      } else {
        //
      }

  }





loadError(message) {
  this.loading=true;
  this.error=message;
  
}

}
