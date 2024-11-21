import { DireccionesDto } from "./direcciones.request.dto";

export interface UsuarioDto {
    id?: number | null | undefined;
    nombres: string,
    apellidos: string,
    password: string,
    correo: string,
    username: string,
    razonSocial: string,
    nit: string,
    direcciones: DireccionesDto[]
}