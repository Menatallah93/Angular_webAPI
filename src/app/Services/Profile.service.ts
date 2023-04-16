import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IComment } from "../Shared-Interface/IComment";
import { IProfile } from '../Shared-Interface/IProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileservicesService {

  constructor(private http: HttpClient) { }

  UpdateData(userid: any, ProfileData: IProfile): Observable<IProfile> {

    return this.http.put<IProfile>(`https://localhost:7223/api/Profile/Data/${userid}`, ProfileData)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  GetData(userid: string): Observable<IProfile> {

    return this.http.get<IProfile>(`https://localhost:7223/api/profile/MyData/${userid}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  ChangePass(id: string, newpass: string, oldpass: string): Observable<object> {

    return this.http.put<object>(`https://localhost:7223/api/profile/password/${id}`, { newpass, oldpass })
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
}