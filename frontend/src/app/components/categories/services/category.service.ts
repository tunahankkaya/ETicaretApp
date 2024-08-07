import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { CategoryModel } from '../models/category.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: GenericHttpService) {}

  getAll(callback: (res: CategoryModel[]) => void) {
    this._http.get<CategoryModel[]>('categories', (res) => callback(res));
  }

  add(name: string, callback: (res: MessageResponseModel) => void) {
    let model = { name: name };
    this._http.post<MessageResponseModel>('categories/add', model, (res) =>
      callback(res)
    );
  }

  update(
    model: CategoryModel,
    callback: (res: MessageResponseModel) => void
  ) {
    this._http.post<MessageResponseModel>('categories/update', model, (res) =>
      callback(res)
    );
  }

  removeById(_id: string, callback: (res: MessageResponseModel) => void) {
    let model = { _id: _id };
    this._http.post<MessageResponseModel>('categories/removeById/',model, res =>
      callback(res)
    );
  }
}
