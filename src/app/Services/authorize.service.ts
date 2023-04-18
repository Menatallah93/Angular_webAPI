import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  currentuser=new BehaviorSubject(null);

  constructor(private myhttp:HttpClient,private _Router:Router) { }
  
  // LogOut()
  // {
  // localStorage.removeItem('userToken');
  // this.currentuser.next(null);
  // this._Router.navigate(['/Login']);
  // }
  
  

  register(kero:any):Observable<any>{
    return this.myhttp.post("https://localhost:7223/api/Account/register",kero);
  }

  login(pop:any):Observable<any>{
    return this.myhttp.post("https://localhost:7223/api/Account/login",pop);
  }
getToken()
{
  let token:any=localStorage.getItem("userInfo");
  this.currentuser= jwtDecode(token);
  console.log(this.currentuser);
}
}
