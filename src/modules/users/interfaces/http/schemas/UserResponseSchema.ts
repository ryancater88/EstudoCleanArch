import { userBaseSchema } from "./UserSchema.js";

const userResponseSchema = userBaseSchema.omit({ 'senha': true })

export {userResponseSchema}