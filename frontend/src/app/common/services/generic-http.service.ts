import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  api: string = 'http://localhost:5000/api';

  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService
  ) {}

  post<T>(api: string, model: any, callback: (res: T) => void) {
    this._spinner.show();
    this._http.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res) => {
        callback(res);
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this._spinner.hide();
        this._toastr.error(err.error.message);
      },
    });
  }

  get<T>(api: string, callback: (res: T) => void) {
    this._http.get<T>(`${this.api}/${api}`).subscribe({
      next: (res) => {
        callback(res);
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this._spinner.hide();
        this._toastr.error(err.error.message);
      },
    });
  }
}
