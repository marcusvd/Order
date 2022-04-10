import { CategoryDto } from "../../category/dto/category-dto";
import { SubCategoryDto } from "../../category/dto/sub-category-dto";
import { UnitOfMeasureDto } from "../../measure/dto/unit-of-measure";

export class ProductDto {
  id: number;
  name: string;
  manunfacture: string;
  quantity: number;
  date: Date;
  category: CategoryDto;
  categoryId: number;
  subCategory: SubCategoryDto;
  subCategoryId: number;
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
  unitOfMeasure: UnitOfMeasureDto;
  unitOfMeasureId: number;
  weight: number;
  description: string;
  comments: string;
}

