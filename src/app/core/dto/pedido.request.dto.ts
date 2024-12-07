import { DetallePedidoRequestDto } from "./detalle-pedido.request.dto";

export interface PedidoRequestDto {
    usuarioId: number,
    detallePedido: DetallePedidoRequestDto[]
}