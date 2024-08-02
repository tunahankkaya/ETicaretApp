export class PaginationResultModel<T> {
  data: T;
  pageNumber:number;
  pageSize:number;
  isLastPage:boolean = true;
  isFirstPage:boolean = true;
  totalPageCount:number = 0;
}