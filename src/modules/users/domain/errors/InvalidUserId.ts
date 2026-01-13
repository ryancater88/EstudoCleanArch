import { AppError } from "@shared/domain/errors/AppError.js"

export class ErrorInvalidUserId extends AppError {
    constructor(){
       super(400, 'Usuário com id inválido')
    }
}