import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
import { Observable, catchError, throwError } from 'rxjs';
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
}
