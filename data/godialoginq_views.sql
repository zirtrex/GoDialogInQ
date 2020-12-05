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
 c.idCliente,
 concat_ws(' ', c.nombres, c.apellidos)cliente,
 c.telefono,
 c.correo,
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
 
  
 
CREATE VIEW vw_getCountCalificabyFecha
AS
SELECT
DATE_FORMAT(F.FECHA,'%d/%m/%Y')fecha, 
SUM(F.califica)califica,
SUM(F.noCalifica)noCalifica,
SUM((califica+nocalifica))total
FROM(SELECT 
	PC.FECHA, 
    (CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) 
    AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN count(*) ELSE 0 END
	)califica,
    0 noCalifica
FROM prestamo_cliente PC WHERE PC.estado<>0
AND (CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) 
		AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN 'C' ELSE 'N' END
		)='C'
GROUP BY 
		PC.FECHA, 
		(CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) 
		AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN 'C' ELSE 'N' END
		)
UNION       
SELECT 
	PC.FECHA, 
    0 califica,
    (CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) 
    AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN 0 ELSE count(*) END
	)noCalifica
FROM prestamo_cliente PC WHERE PC.estado<>0
AND (CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) 
		AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN 'C' ELSE 'N' END
		)='N'
GROUP BY 
		PC.FECHA, 
		(CASE WHEN ((CAST(pc.ingresosAnuales AS DECIMAL (18 , 2 )) >= 5000) 
		AND (CAST(pc.puntajeCredito AS DECIMAL (18 , 2 )) >= 500)) THEN 'C' ELSE 'N' END
		)
)F
WHERE F.FECHA>=DATE_ADD(NOW(), INTERVAL -15 DAY)
GROUP BY DATE_FORMAT(F.FECHA,'%d/%m/%Y')
ORDER BY F.FECHA ASC;

 