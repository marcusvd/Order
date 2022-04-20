import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { CrudService } from "../../../services/crud.service";
import { Url } from "../../../../back-end/back-end";
import { CategoryDto } from "src/app/company/category/dto/category-dto";

@Injectable()
export class DeleteService extends CrudService<any, number>{

  record: any = {};

  constructor(override _Http: HttpClient) { super(_Http, Url._PRODUCTS) }



  toDeleteCat(id: number) {
    return this._Http.delete<CategoryDto>(`${Url._CATEGORIES}/${id}`)
  }







  // remove() {
  //   console.log(this.record);
  //   return this._Http.delete(this.record, this.record.id).subscribe((item) => {
  //     console.log(item)
  //   })

  // }

}


