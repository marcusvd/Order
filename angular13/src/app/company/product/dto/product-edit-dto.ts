import { CategoryDto } from "src/app/company/category/dto/category-dto";
import { SubCategoryDto } from "src/app/company/category/dto/sub-category-dto";
import { MeasureDto } from "../../measure/dto/measure-dto";


export class ProductEditDto {
  id: number;
name: string;
manufacturer: string;
quantity: number;
date: string;
categoryId: number;
category: CategoryDto;
subCategoryId: number;
subCategory: SubCategoryDto;
price: number;
cost: number;
measure: MeasureDto;
measureId: number;
weight: number;
description: string;
barCode: string;
lastPrice: number;
}
