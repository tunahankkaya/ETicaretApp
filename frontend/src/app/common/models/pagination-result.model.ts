export class PaginationResultModel<T> {
  datas: T;
  pageNumber:number;
  pageSize:number;
  isLastPage:boolean = true;
  isFirstPage:boolean = true;
  totalPageCount:number = 0;
}