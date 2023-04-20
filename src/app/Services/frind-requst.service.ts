import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../Shared-Interface/IUser';
@Injectable({
  providedIn: 'root'
})
export class FrindRequstService {

  constructor(private Http: HttpClient) { }

  SenConnect(fromId: string, toId: string) {
    return this.Http.post(`https://localhost:7223/api/Frind/SendRequset`, { fromId, toId })
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  GetRequest(toId: string):Observable<IUser[]> {
    return this.Http.get<IUser[]>(`https://localhost:7223/api/Frind/ToId?ToId=${toId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  AcceptRequest(FromId: string , ToId: string) {
    return this.Http.post(`https://localhost:7223/api/Frind/Accept`, {FromId, ToId})
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  RejectRequest(FromId: string , ToId: string) {
    return this.Http.post(`https://localhost:7223/api/Frind/Reject`, {FromId, ToId})
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
}
