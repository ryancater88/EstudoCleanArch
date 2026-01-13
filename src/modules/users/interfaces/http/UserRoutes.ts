import { FastifyInstance } from "fastify";
import { createUserBodySchema } from "./schemas/CreateUserSchema.js";
import { deleteUserParamSchema } from "./schemas/DeleteUserSchema.js";
import { buildUsersModule } from "@modules/users/main/index.js";
import { updateUserBodySchema, updateUserParamsSchema } from "./schemas/UpdateUserSchema.js";
import { userResponseSchema } from "./schemas/UserResponseSchema.js";


export function userRoutes(app: FastifyInstance) {
    const userModule = buildUsersModule()
    app.post('/user', {
        schema: {
            body: createUserBodySchema,
            response: {
                200: userResponseSchema
            }
        }
    },
        userModule.createUserController.handle
    )

    app.put('/user/:id', {
        schema: {
            body: updateUserBodySchema,
            params: updateUserParamsSchema,
            response: {
                200: userResponseSchema
            }
        }
    },
        userModule.updateUserController.handle
    )

    app.delete('/user/:id', {
        schema: {
            params: deleteUserParamSchema,
            response: {
                204: {}
            }
        }
    },
        userModule.deleteUserController.handle
    )

}