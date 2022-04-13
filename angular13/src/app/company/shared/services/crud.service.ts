



import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductDto } from "../../product/dto/product-dto";
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

  add<T>(record: T): Observable<T> {
    return this._Http.post<T>(this._BackEnd.toLocaleLowerCase(), record);
  }
  update<T>(record: any): Observable<T> {
    return this._Http.put<any>(`${this._BackEnd.toLocaleLowerCase()}/${record.id}`, record)
  }
  delete<T>(record: any): Observable<any> {
    return this._Http.delete<any>(`${this._BackEnd.toLocaleLowerCase()}/${record.id}`, record);
  }
  getAll<T>(): Observable<T[]> {
    return this._Http.get<T[]>(this.BackEnd);
  }
  getByIdAsync<T>(id:number): Observable<T> {
   return this._Http.get<T>(`${this._BackEnd.toLocaleLowerCase()}/${id}`)
  }



}
