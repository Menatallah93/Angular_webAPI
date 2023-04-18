import { Component } from '@angular/core';
import { AuthorizeService } from '../Services/authorize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

 
  constructor(private Auth:AuthorizeService){}

  // Logout(){
  //   this.Auth.LogOut();
  //   }
}
