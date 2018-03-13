import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private router: Router) { 

    
      if(localStorage.getItem('loaded')===null)
      this.refresh();
    
  }
  refresh(): void {
    localStorage.setItem('loaded','1');
    window.location.reload();
}

  check(){
    // if(localStorage.getItem('uid') === null){
    //   this.router.navigate(['/login']);
    // }
  }
  signOut(): void {
    localStorage.clear();


      this.router.navigateByUrl('');
    

  }

  ngOnInit() {
  }

}
