import { TipoPrestamo } from './tipo_prestamo';
import { Cliente } from './cliente';

export class PrestamoCliente {

    public idPrestamoCliente: number;
    public montoNecesitado: string;
    public tiempoNegocio: string;
    public ingresosAnuales: string;
    public puntajeCredito: string;
    public queNegocioTiene: string;
    public comoVaUsar: string;
    public cuanRapidoNecesita: string;
    public idTipoPrestamo : TipoPrestamo;
    public idCliente : Cliente;
    public cliente : string;
        
}

