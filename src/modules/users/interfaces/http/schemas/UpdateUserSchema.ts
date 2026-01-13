import { userBaseSchema } from "./UserSchema.js";

const updateUserParamsSchema = userBaseSchema.pick({id: true})
const updateUserBodySchema = userBaseSchema.omit({id: true})

export {updateUserBodySchema, updateUserParamsSchema}