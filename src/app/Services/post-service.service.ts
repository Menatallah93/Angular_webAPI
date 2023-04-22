import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../Shared-Interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService implements OnInit {

  constructor(private Http: HttpClient) { }

  ngOnInit(): void {

  }
  GetPosts(): Observable<IPost[]> {
    return this.Http.get<IPost[]>('https://localhost:7223/api/Post')
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }
  CreatePost(Post :ICreatePost){
    console.log(Post.image)
    return this.Http.post<ICreatePost>('https://localhost:7223/api/Post',Post)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }

  GetCurrentUser(id : string){
    return this.Http.get<IUser>(`https://localhost:7223/api/Profile/User/${id}`)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }
}
