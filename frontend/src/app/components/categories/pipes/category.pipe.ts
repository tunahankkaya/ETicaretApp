import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Pipe({
  name: 'categoryPipe',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  transform(value: CategoryModel[], search:string): CategoryModel[] {
    if(search == null){
      return value;
    }

    return value.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
  }

}
