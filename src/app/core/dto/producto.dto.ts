export interface ProductoDto{
    id: number;
    categoriaId: number;
    nombreCategoria?: string;
    nombre: string;
    precio: number;
    img: string;
    descripcion: string;
}