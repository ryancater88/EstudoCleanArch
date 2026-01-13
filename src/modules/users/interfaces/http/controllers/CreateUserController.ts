import { CreateUserUseCase } from "@modules/users/application/useCases/CreateUserUseCase.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createUserBodySchema } from "../schemas/CreateUserSchema.js";

export class CreateUserContoller {
    private readonly createUserUseCase: CreateUserUseCase

    constructor(useCase: CreateUserUseCase) { 
        this.createUserUseCase = useCase
    }

    public handle = async(request: FastifyRequest, response: FastifyReply): Promise<void> =>{
        const body = z.parse(createUserBodySchema, request.body)
        const result = await this.createUserUseCase.execute(body)
        response.status(201).send(result)
    }
}