import { Component } from '@angular/core';
import { AuthorizeService } from '../Services/authorize.service';
import { IUser } from '../Shared-Interface/IUser';
import { FrindRequstService } from '../Services/frind-requst.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

 
   
  constructor(private Auth:AuthorizeService,private frindRequest: FrindRequstService){}

  // Logout(){
  //   this.Auth.LogOut();
  //   }

  users:IUser[] = [];
  

ngOnInit(){
this.frindRequest.GetRequest(this.Auth.gettokenID()).subscribe({
  next: data => this.users = data,
  error: err=> console.log(err) 
});
}

AcceptFriends(fromUserId : any){
  this.frindRequest.AcceptRequest(fromUserId , this.Auth.gettokenID()).subscribe({
    next: data => console.log(data),
    error: err=> console.log(err) 
  });
  console.log("hiii : " + fromUserId);
}

RejectFriends(fromUserId : any){
  this.frindRequest.RejectRequest(fromUserId , this.Auth.gettokenID()).subscribe({
    next: data => console.log(data),
    error: err=> console.log(err) 
  });
  console.log("hiii : " + fromUserId);
}
}
