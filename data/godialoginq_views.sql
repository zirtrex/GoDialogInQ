#Vista Requisito y Tipo de Prestamo

USE godialoginq;

CREATE VIEW vw_requisito_getAllByIdTipoPrestamo
AS
	SELECT r.idRequisito, r.descripcionRequisito, tp.idTipoPrestamo, tp.nombreTipoPrestamo 
	FROM requisito r 
    INNER JOIN tipo_prestamo tp ON tp.idTipoPrestamo = r.idTipoPrestamo
	WHERE r.estado <> 0;