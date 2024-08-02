import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }
  
  callSwal(text:string, title:string, btnName:string,  callback:() =>void) {
    swal.fire({
      text:text,
      title:title,
      showConfirmButton:true,
      confirmButtonText:btnName,
      showCancelButton:true,
      cancelButtonText:"Vazgeç",
      icon:"question"
    }).then(res => {
      if (res.isConfirmed) {
        callback();
      }
    });

  }
}
