import { AppError } from "@shared/domain/errors/AppError.js";
import { Uuid } from "@shared/domain/value-objects/Uuid.js";
import { randomUUID } from "node:crypto";

//Aqui eu construo a entidade como um todo TODOS OS PARÂMETROS, INCLUSIVE ID, DATA DE CRIAÇÃO...

type UserInput = {
    id?: string,
    nome: string,
    email: string,
    senha: string
}

export class User {
    public readonly id: string
    public readonly nome: string
    public readonly email: string
    public readonly senha: string

    constructor(data: UserInput) {

        if (!data) throw new AppError(400, 'Informe dados para criar a entidade Usuário')

        this.id = data?.id?.trim() ?? randomUUID()
        this.nome = data.nome.trim()
        this.email = data.email.trim().toLocaleLowerCase()
        this.senha = data.senha

        if (!Uuid.isValid(this.id)) throw new AppError(400, 'Id inválido')
        if (this.nome.length < 3) throw new AppError(400, 'Nome precisa ser maior que 3 caracteres')
        if (!this.email.includes('@')) throw new AppError(400, 'Email precisa possuir @')
        if (this.senha.length < 8) throw new AppError(400, 'Senha precisa ter pelo menos 8 caracteres')
    }

}