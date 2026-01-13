import z from "zod";
import { userSchema } from "../UserSchema.js";

export const deleteUserParamSchema = userSchema.pick({id: true})