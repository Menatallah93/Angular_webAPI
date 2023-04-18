import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import { Observable, catchError, throwError } from 'rxjs';

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
    return this.Http.post<ICreatePost>('https://localhost:7223/api/Post',Post)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }
}
