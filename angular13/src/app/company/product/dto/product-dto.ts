import { CategoryDto } from "../../category/dto/category-dto";

export class ProductDto {
  id:number;
  name: string;
  categoryId: number;
  manunfacture: string;
  quantity: number;
  capacity: number;
  price: number;
  cost: number;
  unitofmeasureId: number;
  description: string;
}
