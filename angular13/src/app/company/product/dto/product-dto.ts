import { CategoryDto } from "../../category/dto/category-dto";

export class ProductDto {
  id: number;
  name: string;
  manunfacture: string;
  quantity: number;
  date: Date;
  subCategoryId: number;
  // capacity: number;
  price: number;
  cost: number;
  //dimensions
  height: string;
  width: string;
  depth: string;
  format: string;
  //state material
  state: string;
  storage: string;

  maxstacked: number;

  unitofmeasureId: number;
  weight: number;
  description: string;
  comments: string;
}

