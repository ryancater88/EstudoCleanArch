import { AppError } from "@shared/domain/errors/AppError.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function HttpErrorHandler(error: unknown, request: FastifyRequest, response: FastifyReply): void {
    if (error instanceof AppError) {
        response
            .status(400)
            .send({
                sucess: false,
                message: error.message,
                result: {}
            })
        return
    }
    else if (error instanceof ZodError) {
        response
            .status(400)
            .send({
                sucess: false,
                message: JSON.parse(error.message)[0].message,
                result: {}
            })

        return
    }

    response
        .status(500)
        .send({
            sucess: false,
            message: error instanceof Error ? error.message : 'Erro interno de servidor',
            result: {}
        })
}