import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  api: string = 'https://localhost:5000/api';

  constructor(private _http: HttpClient) {}

  post<T>(api: string, model: T, callback: (res: T) => void) {
    this._http.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res) => {
        callback(res);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }

  get<T>(api: string, callback: (res: T) => void) {
    this._http.get<T>(`${this.api}/${api}`).subscribe({
      next: (res) => {
        callback(res);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }
}
