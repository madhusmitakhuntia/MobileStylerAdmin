import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UpdateprofileService } from '../services/updateprofile.service';
import { AngularFireDatabase } from 'angularfire2/database';


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
    productKey:'',
    productName: '',
    price: '',
    like: '',
    image: '',

  };
  profile_updateable: boolean = true;
  constructor(private productService: ProductService, private obj: FormBuilder,public updateProfileService:UpdateprofileService,public db: AngularFireDatabase) {
    this.updateUser = {
      productKey:'',
      productName: '',
      price: '',
      like: '',
      image: '',

    };

    this.updateUser = obj.group({
      'productKey': [null],
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
     'productKey':pro,
      'productName': pname,
      'price': price,
      'like': like,
      'image': ""
    });
    //this.updateInfo(pro);
  //  var prokey=pro;

  }
  hideUpdateModal() {
    this.updatePage = !this.updatePage;
    this.modal_opened = !this.modal_opened;
  }
  
  updateInfo(pro) {
    //alert(proname+price+like);
  //   let data = this.updateUser.value;

  //  let json = data;
  //   console.log("data" + JSON.stringify(json));
  //   console.log(data);
  //   this.updateProfileService.updateData(data,pro).then(resolve => {
  //     console.log('updated success');
      
  //   }, reject => {
     
  //     console.log(reject);
  //   });
  alert(this.prokey);
    this.db.list('/products').update(pro,{pname:'data updated'});
    //this.db.list('/products').push({pname:'data pushed'});

  }
}
// this.profileService.saveProfile(json).then(resolve => {
//   this.loader = true;
//   this.goToLogin();
// }, reject => {
//   this.loader = true;
//   console.log(reject);
// });
