



import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICrudService } from "./icrud.service";

@Injectable()

export abstract class CrudService<T, ID> implements ICrudService<T, ID> {

  private BackEnd: string;
  constructor(
    protected _Http: HttpClient,
    protected _BackEnd: String,
  ) {
    this.BackEnd = _BackEnd.toLocaleLowerCase();
  }

  add<T>(record: T):Observable<T> {
   return this._Http.post<T>(this._BackEnd.toLocaleLowerCase(), record)
  }
  update<T>(record: T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  delete<T>(record: T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  getAll<T>(): Observable<T[]> {
    return this._Http.get<T[]>(this.BackEnd);
  }
  getById<T>(record: T): Observable<T> {
    throw new Error("Method not implemented.");
  }



}
