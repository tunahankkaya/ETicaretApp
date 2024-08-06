import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { ProductModel } from '../products/models/product.model';
import { ProductService } from '../products/services/product.service';
import { RequestModel } from '../../common/models/request.model';
import { BasketModel } from '../basket/models/basket.model';
import { BasketService } from '../basket/services/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: CategoryModel[] = [];
  products: ProductModel[] = [];
  request: RequestModel = new RequestModel();

  constructor(
    private _category: CategoryService,
    private _product: ProductService,
    private _basket: BasketService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this._category.getAll((res) => (this.categories = res));
  }

  changeCategory(id: string, categoryName: string) {
    this.request.categoryName = categoryName;
    this.request.categoryId = id;
    this.getProducts();
  }

  getProducts() {
    this._product.getAllForHomePage(
      this.request,
      (res) => (this.products = res)
    );
  }

  addBasket(productId: string, price: number) {
    let model = new BasketModel();
    model.productId = productId;
    model.price = price;
    model.quantity = 1;
    this._basket.add(model, (res) => {
      this._toastr.success('Ürün sepete eklendi', 'Başarılı');
    });
    this.getProducts();
  }
}
