import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  orders: OrderModel[] = [];

  constructor(private _orders: OrderService) {}
  ngOnInit(): void {
    this._orders.getAll((res) => {
      this.orders = res;
    });
  }


}
