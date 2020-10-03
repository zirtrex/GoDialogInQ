-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema godialoginq
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema godialoginq
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `godialoginq` DEFAULT CHARACTER SET utf8 ;
USE `godialoginq` ;

-- -----------------------------------------------------
-- Table `godialoginq`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `godialoginq`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Apellidos` VARCHAR(100) NULL,
  `Nombres` VARCHAR(100) NULL,
  `TipoDocumento` VARCHAR(3) NULL,
  `Documento` VARCHAR(20) NULL,
  `FechaNacimiento` DATETIME NULL,
  `Sexo` VARCHAR(3) NULL,
  `Telefono` VARCHAR(15) NULL,
  `Correo` VARCHAR(200) NULL,
  `Movil` VARCHAR(20) NULL,
  `Direccion` VARCHAR(500) NULL,
  `RazonSocial` VARCHAR(20) NULL,
  `Estado` VARCHAR(1) NULL,
  PRIMARY KEY (`idCliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `godialoginq`.`TipoPrestamo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `godialoginq`.`TipoPrestamo` (
  `idTipoPrestamo` INT NOT NULL AUTO_INCREMENT,
  `NombreTipoPrestamo` VARCHAR(200) NULL,
  `Estado` VARCHAR(1) NULL,
  PRIMARY KEY (`idTipoPrestamo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `godialoginq`.`PrestamosCliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `godialoginq`.`PrestamosCliente` (
  `idPrestamosCliente` INT NOT NULL AUTO_INCREMENT,
  `CuantoNecesita` VARCHAR(50) NULL,
  `HaceCuantoEmpezaste` VARCHAR(50) NULL,
  `IngresiosNegocioAño` VARCHAR(50) NULL,
  `PuntajeCredito` VARCHAR(50) NULL,
  `Estado` VARCHAR(1) NULL,
  `idCliente` INT NOT NULL,
  `idTipoPrestamo` INT NOT NULL,
  PRIMARY KEY (`idPrestamosCliente`))
ENGINE = InnoDB;

CREATE INDEX `fk_PrestamosCliente_Cliente1_idx` ON `godialoginq`.`PrestamosCliente` (`idCliente` ASC);

CREATE INDEX `fk_PrestamosCliente_TipoPrestamo1_idx` ON `godialoginq`.`PrestamosCliente` (`idTipoPrestamo` ASC);


-- -----------------------------------------------------
-- Table `godialoginq`.`DocumentacionCliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `godialoginq`.`DocumentacionCliente` (
  `idDocumentacionCliente` INT NOT NULL AUTO_INCREMENT,
  `NombreDocumentacion` VARCHAR(100) NULL,
  `Valor` VARCHAR(1000) NULL,
  `Estado` VARCHAR(1) NULL,
  `idPrestamosCliente` INT NOT NULL,
  PRIMARY KEY (`idDocumentacionCliente`))
ENGINE = InnoDB;

CREATE INDEX `fk_DocumentacionCliente_PrestamosCliente1_idx` ON `godialoginq`.`DocumentacionCliente` (`idPrestamosCliente` ASC);


-- -----------------------------------------------------
-- Table `godialoginq`.`Requisito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `godialoginq`.`Requisito` (
  `idRequisito` INT NOT NULL AUTO_INCREMENT,
  `DescripcionRequisito` VARCHAR(200) NULL,
  `Estado` VARCHAR(1) NULL,
  `idTipoPrestamo` INT NOT NULL,
  PRIMARY KEY (`idRequisito`))
ENGINE = InnoDB;

CREATE INDEX `fk_Requisito_TipoPrestamo_idx` ON `godialoginq`.`Requisito` (`idTipoPrestamo` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
