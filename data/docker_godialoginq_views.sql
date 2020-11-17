#Vista Requisito y Tipo de Prestamo

USE `godialoginq`;

ALTER TABLE `requisito`
ADD UNIQUE KEY `res_desReqPoridPrestamo` (`descripcionRequisito`,`idTipoPrestamo`);

CREATE VIEW vw_requisito_getAllByIdTipoPrestamo
AS
	SELECT r.idRequisito, r.descripcionRequisito, tp.idTipoPrestamo, tp.nombreTipoPrestamo 
	FROM requisito r 
    INNER JOIN tipo_prestamo tp ON tp.idTipoPrestamo = r.idTipoPrestamo
	WHERE r.estado <> 0;



CREATE VIEW vw_prestamo_cliente_getAllClienteTipoPrestamo
AS
 SELECT 
 pc.idPrestamoCliente,
 tp.nombreTipoPrestamo,
 concat_ws(' ', c.apellidos, c.nombres)cliente,
 pc.montoNecesitado,
 pc.tiempoNegocio,
 pc.ingresosAnuales, 
 pc.puntajeCredito, 
 pc.queNegocioTiene, 
 pc.comoVaUsar, 
 pc.cuanRapidoNecesita,
 (CASE WHEN (CAST(pc.ingresosAnuales AS DECIMAL(18,2))>=5000 AND CAST(pc.puntajeCredito AS DECIMAL(18,2))>=500) THEN 'Califica' ELSE 'No califica' END)calificacion
 FROM prestamo_cliente pc
 INNER JOIN cliente c ON pc.idCliente=c.idCliente
 INNER JOIN tipo_prestamo tp ON tp.idTipoPrestamo=pc.idTipoPrestamo
 WHERE pc.estado<>0;
 