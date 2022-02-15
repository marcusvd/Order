import { Observable } from "rxjs";

export interface ICrudService<T, ID> {
  add<T>(record: T): Observable<T>;
  update<T>(record: T): Observable<T>;
  delete<T>(record: T): Observable<T>;
  getAll<T>(): Observable<T[]>;
  getById<T>(record: T): Observable<T>;

}
