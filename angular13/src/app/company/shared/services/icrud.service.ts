import { Observable } from "rxjs";

export interface ICrudService<T, ID> {
  add<T>(record: T): Observable<T>;
  update<T>(record: T): Observable<T>;
  delete<T>(record: any): Observable<any>;
  getAll<T>(): Observable<T[]>;
  getByIdAsync<T>(id:number): Observable<T>;

}
