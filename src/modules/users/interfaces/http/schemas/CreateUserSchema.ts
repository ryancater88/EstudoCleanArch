import z from "zod";
import { userBaseSchema } from "./UserSchema.js";

export const createUserBodySchema = userBaseSchema.omit({id: true}) 