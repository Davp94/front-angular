import { ProductoDto } from "./producto.dto";

export interface ProductoPaginationDto{
    totalPages: number;
    totalRecords: number;
    take: string;
    page: string;
    sortParam: string;
    content: ProductoDto[];
}