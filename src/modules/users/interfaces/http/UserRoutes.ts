import { FastifyInstance } from "fastify";
import { makeCreateUserController } from "@modules/users/main/factories/makeCreateUserController.js";

const createUserController = makeCreateUserController()

export function userRoutes(app: FastifyInstance) {
    app.post('/user', createUserController.handle.bind(createUserController))
}