import { userRoutes } from "@modules/users/interfaces/http/UserRoutes.js";
import { HttpErrorHandler } from "@shared/infra/errors/HttpErrorHandler.js";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(HttpErrorHandler)

//Routes
userRoutes(app)

export {app}