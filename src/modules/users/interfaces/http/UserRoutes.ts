import { FastifyInstance } from "fastify";
import { makeCreateUserController } from "@modules/users/main/factories/makeCreateUserController.js";
import { createUserBodySchema } from "./createUser/CreateUserSchema.js";
import makeDeleteUserController from "@modules/users/main/factories/makeDeleteUserController.js";
import { deleteUserParamSchema } from "./deleteUser/DeleteUserSchema.js";

const createUserController = makeCreateUserController()
const deleteUserController = makeDeleteUserController()

export function userRoutes(app: FastifyInstance) {
    app.post('/user', {
        schema: {
            body: createUserBodySchema,
            response: {
                201: {}
            }
        }
    },
        createUserController.handle.bind(createUserController)
    )

    app.delete('/user/:id', {
        schema: {
            params: deleteUserParamSchema,
            response: {
                204: {}
            }
        }
    },
        deleteUserController.handle.bind(deleteUserController)
    )

}