import { AppError } from "@shared/domain/errors/AppError.js"

export class ErrorUserEmailAlreadyUse extends AppError {
    constructor(){
       super(400, 'Email já em uso')
    }
}