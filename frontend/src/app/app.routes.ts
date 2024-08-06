import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/layouts/layouts.component').then(
        (c) => c.LayoutsComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import("./components/products/components/product/product.component").then(
            (c) => c.ProductComponent
          ),
      },
      {
        path: 'products/add',
        loadComponent: () =>
          import('./components/products/components/product-add/product-add.component').then(
            (c) => c.ProductAddComponent
          ),
      },
      {
        path: 'products/update/:value',
        loadComponent: () =>
          import('./components/products/components/product-update/product-update.component').then(
            (c) => c.ProductUpdateComponent
          ),
      },
      {
        path: 'basket',
        loadComponent: () =>
          import('./components/basket/components/basket/basket.component').then(
            (c) => c.BasketComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./components/orders/component/order/order.component').then(
            (c) => c.OrderComponent
          ),
      },
    ],
  },
];
