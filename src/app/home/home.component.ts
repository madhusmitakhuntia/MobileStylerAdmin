import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    if(localStorage.getItem('loaded')===null)
    this.refresh();
   }

  ngOnInit() {
   
  }
  refresh(): void {
    localStorage.setItem('loaded','1');
    window.location.reload();
}

  check(){
    if(localStorage.getItem('uid') === null){
      this.router.navigate(['/login']);
    }
  }
}
