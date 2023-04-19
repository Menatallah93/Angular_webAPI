import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IComment } from "../Shared-Interface/IComment";
import { IProfile } from '../Shared-Interface/IProfile';
import { IChangePass } from '../Shared-Interface/IChangePass';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import * as signalR from '@aspnet/signalr'
import { IUser } from '../Shared-Interface/IUser';
@Injectable({
  providedIn: 'root'
})
export class SignalRsService {

    hubconnection!: signalR.HubConnection;
    Mypost!: ICreatePost;
    Myuserid! : string;
  constructor(private http: HttpClient) { }

  StartPostConnection(){
    this.hubconnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/Posthub',
    {
        skipNegotiation : true ,
         transport:signalR.HttpTransportType.WebSockets
    }).configureLogging(signalR.LogLevel.Debug).build();

    this.hubconnection.start().then(()=>{
        console.log("Hello Connection")
    }).catch(err => console.log(err))
  }


  askServer(post:ICreatePost,id:string){
    this.Mypost = post;
    this.Myuserid = id;
    this.hubconnection.invoke('NewPost',post,id)
    this.hubconnection.on("PostAdded",function(Myuserid,Mpost){
        console.log(Myuserid);
        console.log(Mpost);
    })
  }



  

  PostAdded(user:string){
    
      console.log(user);
      
  }
}