



import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductDto } from "../../product/dto/product-dto";
import { ICrudService } from "./icrud.service";

@Injectable()

export abstract class CrudService<T, ID> implements ICrudService<T, ID> {

  private backEnd: string;
  constructor(
    protected Http: HttpClient,
    protected BackEnd: String,
  ) {
    this.backEnd = BackEnd.toLocaleLowerCase();
  }

  add<T>(record: T): Observable<T> {
    return this.Http.post<T>(this.backEnd.toLocaleLowerCase(), record);
  }
  update<T>(record: any): Observable<T> {
    return this.Http.put<any>(`${this.backEnd.toLocaleLowerCase()}/${record.id}`, record)
  }
  delete<T>(record: any): Observable<any> {
    return this.Http.delete<any>(`${this.backEnd.toLocaleLowerCase()}/${record.id}`, record);
  }
  getAll<T>(): Observable<T[]> {
    return this.Http.get<T[]>(this.backEnd);
  }
  getByIdAsync<T>(id:number): Observable<T> {
   return this.Http.get<T>(`${this.backEnd.toLocaleLowerCase()}/${id}`)
  }



}
