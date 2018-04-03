import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UpdateprofileService } from '../services/updateprofile.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [ProductService]
})
export class DataComponent implements OnInit {
  products: any = {};
  items: any = [];
  prokey: any = [];
  rows: any = [];
  key: any = "";
  value: any = "";
  modal_opened: boolean = true;
  updatePage: any = true;
  updateUser: any = {
    productName: '',
    price: '',
    like: '',
    image: '',

  };
  profile_updateable: boolean = true;
  constructor(private productService: ProductService, private obj: FormBuilder) {
    this.updateUser = {
      productName: '',
      price: '',
      like: '',
      image: '',

    };

    this.updateUser = obj.group({
      'productName': [null],
      'price': [null],
      'like': [null],
      'image': [null],

    });


  }
  ngOnInit() {
    this.productService.readProducts()
      .subscribe(products => {
        this.products = products['products']
        //console.log(products);
        //this.items=this.products;
        //console.log(this.products);
        // console.log(Object.keys(products.products)[0]);
        // console.log((Object.values(products.products)[2].pname);
        //console.log((Object.values(products.products)[2]));
        //console.log((Object.values(this.products)));
        //console.log(Object.values(this.products).length);
        this.items = Object.values(this.products);
        this.prokey = Object.keys(this.products);
      });


  }
  showUpdateModal(pro, pname, price, like) {
    alert(pro + pname + price + like);

    this.updatePage = !this.updatePage;
    this.modal_opened = !this.modal_opened;
    this.updateUser.setValue({
      'productName': pname,
      'price': price,
      'like': like,
      'image': ""
    });


  }
  hideUpdateModal() {
    this.updatePage = !this.updatePage;
    this.modal_opened = !this.modal_opened;
  }
  
  updateInfo() {
    //alert(proname+price+like);
    let data = this.updateUser.value;

   let json = data;
    console.log("data" + JSON.stringify(json));
    console.log(data);
    // this.updateProfileService.updateData(json).then(resolve => {
    //   console.log(resolve);
      
    // }, reject => {
     
    //   console.log(reject);
    // });
    

  }
}
// this.profileService.saveProfile(json).then(resolve => {
//   this.loader = true;
//   this.goToLogin();
// }, reject => {
//   this.loader = true;
//   console.log(reject);
// });