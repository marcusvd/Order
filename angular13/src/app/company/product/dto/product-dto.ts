import { CategoryDto } from "../../category/dto/category-dto";

export class ProductDto {
  id: number;
  name: string;
  date: Date;
  categoryId: number;
  manunfacture: string;
  quantity: number;
  // capacity: number;
  price: number;
  cost: number;
  //dimensions
  height: string;
  width: string;
  depth: string;
  shape:string;
  //state material
  state: string;
  storage:string;
  maxstacked:number;

  unitofmeasureId: number;
  description: string;
  comments: string;
}
