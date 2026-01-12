import z from "zod";

export const createUserBodySchema = z.object({
    nome: z.string('Nome precisa ser uma string').min(3, 'Nome precisa ter no mínimo 3 caracteres').max(80, 'Nome precisa ter no máximo 80 caracteres'),
    email: z.email('Email inválido').max(80, 'Email não dever exceder 80 caracteres'),
    senha: z.string('Senha precisa ser uma string válida').min(8, 'Senha precisa ter no mínimo 8 caracteres')
}, 'Informe um objeto de usuário válido')