import z from "zod";
import { userBaseSchema } from "./UserSchema.js";

export const deleteUserParamSchema = userBaseSchema.pick({id: true})