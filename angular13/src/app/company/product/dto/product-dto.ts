import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { UnitOfMeasureDto } from "../../measure/dto/unit-of-measure";

export class ProductDto {
  id: number;
  name: string;
  manufacturer: string;
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

