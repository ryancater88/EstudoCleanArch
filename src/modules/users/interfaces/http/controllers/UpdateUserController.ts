import { UpdateUserUseCase } from "@modules/users/application/useCases/UpdateUserUseCase.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { updateUserBodySchema, updateUserParamsSchema } from "../schemas/UpdateUserSchema.js";


export class UpdateUserController {
    private readonly _useCase: UpdateUserUseCase

    constructor (
        useCase: UpdateUserUseCase
    ) {
        this._useCase = useCase
    }

    public handle = async(request: FastifyRequest, response: FastifyReply): Promise<void> =>{
        const params = z.parse(updateUserParamsSchema, request.params)
        const body = z.parse(updateUserBodySchema, request.body)

        const result = await this._useCase.execute(params.id, body)

        response.status(200).send(result)
    }
}