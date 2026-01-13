import { AppError } from "@shared/domain/errors/AppError.js"

export class ErrorUserNotExist extends AppError {
    constructor(){
       super(400, 'Usuário com id inexistente')
    }
}