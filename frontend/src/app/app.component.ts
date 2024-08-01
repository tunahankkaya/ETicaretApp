import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgxSpinnerModule],
  template: `
    <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      size="medium"
      color="#fff"
      type="ball-clip-rotate"
      [fullScreen]="true"
      ><p style="color: white">Lütfen Bekleyiniz...</p></ngx-spinner
    >
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
