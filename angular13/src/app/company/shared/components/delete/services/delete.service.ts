import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { CrudService } from "../../../services/crud.service";
import { Url } from "../../../../back-end/back-end";

@Injectable()
export class DeleteService extends CrudService<any, number>{

  record: any = {};

  constructor(override _Http: HttpClient) { super(_Http, Url._PRODUCTS) }

  // remove() {
  //   console.log(this.record);
  //   return this._Http.delete(this.record, this.record.id).subscribe((item) => {
  //     console.log(item)
  //   })

  // }

}


