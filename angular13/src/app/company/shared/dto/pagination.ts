

export class Pagination {
  currentPg: number;
  itemsPerPg: number;
  amountItems: number;
  amountPg: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination
}
