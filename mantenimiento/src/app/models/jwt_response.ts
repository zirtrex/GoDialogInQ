export interface JwtResponseI {
    status: string,
    message: string,
    result: {              
        nombres: string,
        correo: string,
        clave: string,
        accessToken: string,
        expiresIn: string        
    }
}