import { ProductoDto } from "./producto.dto";

export interface ProductoPaginationDto{
    totalPages: number;
    totalRecords: number;
    take: string;
    sortParam: string;
    content: ProductoDto[];
}