-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema godialoginq
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`idCliente`),
  UNIQUE INDEX `idCliente_UNIQUE` (`idCliente` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tipo_prestamo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tipo_prestamo` (
  `idTipoPrestamo` INT NOT NULL AUTO_INCREMENT,
  `nombreTipoPrestamo` VARCHAR(200) NULL DEFAULT NULL,
  `estado` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idTipoPrestamo`),
  UNIQUE INDEX `idTipoPrestamo_UNIQUE` (`idTipoPrestamo` ASC) VISIBLE,
  UNIQUE INDEX `nombreTipoPrestamo_UNIQUE` (`nombreTipoPrestamo` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `prestamo_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_cliente` (
  `idPrestamoCliente` INT NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`idPrestamoCliente`),
  INDEX `fk_prestamo_cliente_tipo_prestamo_idx` (`idTipoPrestamo` ASC) VISIBLE,
  INDEX `fk_prestamo_cliente_cliente1_idx` (`idCliente` ASC) VISIBLE,
  UNIQUE INDEX `idPrestamoCliente_UNIQUE` (`idPrestamoCliente` ASC) VISIBLE,
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
  INDEX `fk_documentacion_cliente_prestamo_cliente1_idx` (`idPrestamoCliente` ASC) VISIBLE,
  UNIQUE INDEX `idDocumentacionCliente_UNIQUE` (`idDocumentacionCliente` ASC) VISIBLE,
  CONSTRAINT `fk_documentacion_cliente_prestamo_cliente1`
    FOREIGN KEY (`idPrestamoCliente`)
    REFERENCES `prestamo_cliente` (`idPrestamoCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `requisito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `requisito` (
  `idRequisito` INT NOT NULL AUTO_INCREMENT,
  `descripcionRequisito` VARCHAR(200) NULL DEFAULT NULL,
  `estado` VARCHAR(1) NULL DEFAULT NULL,
  `idTipoPrestamo` INT NOT NULL,
  PRIMARY KEY (`idRequisito`),
  INDEX `fk_requisito_tipo_prestamo1_idx` (`idTipoPrestamo` ASC) VISIBLE,
  UNIQUE INDEX `idRequisito_UNIQUE` (`idRequisito` ASC) VISIBLE,
  UNIQUE INDEX `idTipoPrestamo_UNIQUE` (`idTipoPrestamo` ASC) VISIBLE,
  UNIQUE INDEX `descripcionRequisito_UNIQUE` (`descripcionRequisito` ASC) VISIBLE,
  CONSTRAINT `fk_requisito_tipo_prestamo1`
    FOREIGN KEY (`idTipoPrestamo`)
    REFERENCES `tipo_prestamo` (`idTipoPrestamo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
