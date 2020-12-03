export interface JwtResponseI {

    usuarioData: {        
        nombres: string,
        correo: string,
        clave: string,
        accessToken: string,
        expiresIn: string,
    }

}