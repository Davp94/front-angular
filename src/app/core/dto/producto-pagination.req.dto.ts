import { OrderEnum } from "../../shared/enum/order.enum";
import { ProductoDto } from "./producto.dto";

export interface ProductoPaginationRequestDto{
    take: number | 10;
    page: number | 0;
    sortDireccion: OrderEnum | OrderEnum.ASC;
    sortParam: string | 'id';
}