import { DeleteUserUseCase } from "@modules/users/application/useCases/DeleteUserUseCase.js";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { deleteUserParamSchema } from "../schemas/DeleteUserSchema.js";

export class DeleteUserController {
    private _useCase: DeleteUserUseCase

    constructor(useCase: DeleteUserUseCase) {
        this._useCase = useCase
    }

    public handle = async(request: FastifyRequest, response: FastifyReply): Promise<void> =>{
        const param = z.parse(deleteUserParamSchema, request.params)
        await this._useCase.execute(param.id)
        response.status(204).send()
    }
}