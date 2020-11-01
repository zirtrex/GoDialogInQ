-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema godialoginq
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `godialoginq` ;

-- -----------------------------------------------------
-- Schema godialoginq
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `godialoginq` DEFAULT CHARACTER SET utf8 ;
USE `godialoginq` ;

-- -----------------------------------------------------
-- Table `cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `idSession` VARCHAR(500) NOT NULL,
  `apellidos` VARCHAR(100) NULL DEFAULT NULL,
  `nombres` VARCHAR(100) NULL DEFAULT NULL,
  `tipoDocumento` VARCHAR(10) NULL DEFAULT NULL,
  `documento` VARCHAR(20) NULL DEFAULT NULL,
  `fechaNacimiento` DATETIME NULL DEFAULT NULL,
  `sexo` VARCHAR(3) NULL DEFAULT NULL,
  `telefono` VARCHAR(15) NULL DEFAULT NULL,
  `correo` VARCHAR(200) NULL DEFAULT NULL,
  `movil` VARCHAR(20) NULL DEFAULT NULL,
  `direccion` VARCHAR(500) NULL DEFAULT NULL,
  `razonSocial` VARCHAR(20) NULL DEFAULT NULL,
  `estado` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idCliente`, `idSession`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE UNIQUE INDEX `idCliente_UNIQUE` ON `cliente` (`idCliente` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `tipo_prestamo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tipo_prestamo` (
  `idTipoPrestamo` INT NOT NULL AUTO_INCREMENT,
  `nombreTipoPrestamo` VARCHAR(200) NULL DEFAULT NULL,
  `estado` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idTipoPrestamo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE UNIQUE INDEX `idTipoPrestamo_UNIQUE` ON `tipo_prestamo` (`idTipoPrestamo` ASC) VISIBLE;

CREATE UNIQUE INDEX `nombreTipoPrestamo_UNIQUE` ON `tipo_prestamo` (`nombreTipoPrestamo` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `prestamo_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_cliente` (
  `idPrestamoCliente` INT NOT NULL AUTO_INCREMENT,
  `idSession` VARCHAR(500) NOT NULL,
  `montoNecesitado` VARCHAR(50) NULL DEFAULT NULL,
  `tiempoNegocio` VARCHAR(50) NULL DEFAULT NULL,
  `ingresosAnuales` VARCHAR(50) NULL DEFAULT NULL,
  `puntajeCredito` VARCHAR(50) NULL DEFAULT NULL,
  `queNegocioTiene` VARCHAR(50) NULL,
  `comoVaUsar` VARCHAR(50) NULL,
  `cuanRapidoNecesita` VARCHAR(50) NULL,
  `estado` VARCHAR(1) NULL DEFAULT NULL,
  `idTipoPrestamo` INT NOT NULL,
  `idCliente` INT NOT NULL,
  PRIMARY KEY (`idPrestamoCliente`, `idSession`),
  CONSTRAINT `fk_prestamo_cliente_tipo_prestamo`
    FOREIGN KEY (`idTipoPrestamo`)
    REFERENCES `tipo_prestamo` (`idTipoPrestamo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prestamo_cliente_cliente1`
    FOREIGN KEY (`idCliente`)
    REFERENCES `cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `fk_prestamo_cliente_tipo_prestamo_idx` ON `prestamo_cliente` (`idTipoPrestamo` ASC) VISIBLE;

CREATE INDEX `fk_prestamo_cliente_cliente1_idx` ON `prestamo_cliente` (`idCliente` ASC) VISIBLE;

CREATE UNIQUE INDEX `idPrestamoCliente_UNIQUE` ON `prestamo_cliente` (`idPrestamoCliente` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `documentacion_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `documentacion_cliente` (
  `idDocumentacionCliente` INT NOT NULL AUTO_INCREMENT,
  `nombreDocumentacion` VARCHAR(100) NULL DEFAULT NULL,
  `valor` VARCHAR(1000) NULL DEFAULT NULL,
  `estado` VARCHAR(1) NULL DEFAULT NULL,
  `idPrestamoCliente` INT NOT NULL,
  PRIMARY KEY (`idDocumentacionCliente`),
  CONSTRAINT `fk_documentacion_cliente_prestamo_cliente1`
    FOREIGN KEY (`idPrestamoCliente`)
    REFERENCES `prestamo_cliente` (`idPrestamoCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `fk_documentacion_cliente_prestamo_cliente1_idx` ON `documentacion_cliente` (`idPrestamoCliente` ASC) VISIBLE;

CREATE UNIQUE INDEX `idDocumentacionCliente_UNIQUE` ON `documentacion_cliente` (`idDocumentacionCliente` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `requisito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `requisito` (
  `idRequisito` INT NOT NULL AUTO_INCREMENT,
  `descripcionRequisito` VARCHAR(200) NULL DEFAULT NULL,
  `estado` VARCHAR(1) NULL DEFAULT NULL,
  `idTipoPrestamo` INT NOT NULL,
  PRIMARY KEY (`idRequisito`),
  CONSTRAINT `fk_requisito_tipo_prestamo1`
    FOREIGN KEY (`idTipoPrestamo`)
    REFERENCES `tipo_prestamo` (`idTipoPrestamo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `fk_requisito_tipo_prestamo1_idx` ON `requisito` (`idTipoPrestamo` ASC) VISIBLE;

CREATE UNIQUE INDEX `idRequisito_UNIQUE` ON `requisito` (`idRequisito` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `tipo_prestamo`
-- -----------------------------------------------------
START TRANSACTION;
USE `godialoginq`;
INSERT INTO `tipo_prestamo` (`idTipoPrestamo`, `nombreTipoPrestamo`, `estado`) VALUES (DEFAULT, 'Plazo fijo', '1');
INSERT INTO `tipo_prestamo` (`idTipoPrestamo`, `nombreTipoPrestamo`, `estado`) VALUES (DEFAULT, 'Línea de crédito', '1');
INSERT INTO `tipo_prestamo` (`idTipoPrestamo`, `nombreTipoPrestamo`, `estado`) VALUES (DEFAULT, 'Dinero por tus facturas', '1');
INSERT INTO `tipo_prestamo` (`idTipoPrestamo`, `nombreTipoPrestamo`, `estado`) VALUES (DEFAULT, '7A Express', '1');
INSERT INTO `tipo_prestamo` (`idTipoPrestamo`, `nombreTipoPrestamo`, `estado`) VALUES (DEFAULT, '7A', '1');
INSERT INTO `tipo_prestamo` (`idTipoPrestamo`, `nombreTipoPrestamo`, `estado`) VALUES (DEFAULT, 'Compras de propiedades comerciales', '1');
INSERT INTO `tipo_prestamo` (`idTipoPrestamo`, `nombreTipoPrestamo`, `estado`) VALUES (DEFAULT, 'coronavirus', '1');

COMMIT;


-- -----------------------------------------------------
-- Data for table `requisito`
-- -----------------------------------------------------
START TRANSACTION;
USE `godialoginq`;
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Estados de cuenta bancario del negocio de los últimos 3 meses', '1', 1);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Aplicación firmada', '1', 1);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'ID estatal', '1', 1);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Los últimos 3 estados de cuenta bancarios', '1', 2);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'ID estatal', '1', 2);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Aplicación firmada', '1', 2);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'El invoice por cobrar', '1', 3);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Bank Statements del negocio', '1', 3);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'ID del o los dueños', '1', 3);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos de negocios', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de ingresos y egresos al 30 de enero del 2020', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Forma 4506T del IRS', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Personal Financial Statement (SBA Form 413)', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'SBA Form 1368', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos personales del o los dueños', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'ID de o de los dueños del negocio', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Crédito requerido: al menos 600 puntos', '1', 4);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos de negocios últimos 3 años', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos personales últimos 2 años', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Financial Statement de los últimos dos años', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Business Plan y Proyecciones Financieras', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Personal Financial Statement (SBA Form 413)', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'SBA Form 1368', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Bank statements del negocio de los últimos 12 meses', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos personales del o los dueños', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'ID de o de los dueños del negocio', '1', 5);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos de negocios últimos 3 años', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos personales últimos 2 años', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Financial Statement de los últimos dos años', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Personal Financial Statement (SBA Form 413)', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'SBA Form 1368', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Bank statements del negocio de los últimos 12 meses', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Declaración de impuestos personales del o los dueños', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'Información de la propiedad', '1', 6);
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `estado`, `idTipoPrestamo`) VALUES (DEFAULT, 'ID de o de los dueños del negocio', '1', 6);

COMMIT;

