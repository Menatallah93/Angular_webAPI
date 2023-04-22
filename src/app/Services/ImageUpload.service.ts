import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../Shared-Interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService implements OnInit {

  constructor(private Http: HttpClient) { }

  ngOnInit(): void {

  }

  
  
}
