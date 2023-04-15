import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {IComment } from "../Shared-Interface/IComment";

@Injectable({
  providedIn: 'root'
})
export class CommentservicesService {

  constructor(private http:HttpClient ) { }

  GetComment(postid:any):Observable<IComment[]>{
    return this.http.get<IComment[]>(`https://localhost:44335/api/Comment/${postid}`)
    .pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
}