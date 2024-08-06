import { Component, model, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { BasketService } from '../../services/basket.service';
import { BasketModel } from '../../models/basket.model';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent implements OnInit {
  baskets: BasketModel[];
  sum: number = 0;

  constructor(
    private _basket: BasketService,
    private _swal: SwalService,
    private _toastr: ToastrService,
    private _order: OrderService
  ) {}
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._basket.getAll((res) => {
      this.baskets = res;
      this.calculate();
    });
  }

  removeById(id: string) {
    this._swal.callSwal(
      'Ürünü sepetten silmek istiyor musunuz?',
      'Ürünü Sil',
      'Sil',
      () => {
        let model = { _id: id };
        this._basket.removeById(model, (res) => {
          this._toastr.info(res.message);
          this.getAll();
        });
      }
    );
  }

  calculate() {
    this.sum = 0;
    this.baskets.forEach((element) => {
      this.sum += element.price * element.quantity;
    });
  }

  createOrder() {
    this._swal.callSwal(
      'Siparişinizi oluşturmak istiyor musunuz?',
      'Sipariş Oluştur',
      'Oluştur',
      () => {
        this._order.create((res) => {
          this._toastr.success(res.message);
          this.getAll();
        });
      }
    );
  }
}
