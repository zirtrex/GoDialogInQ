import { TipoPrestamo } from './tipo_prestamo';

export class Requisito {

    constructor(
        public idRequisito:number,
        public descripcionRequisito:string,
        public estado:number,
        public idTipoPrestamo:number,
        public tipoPrestamo: TipoPrestamo
    )
    {

    }
}

