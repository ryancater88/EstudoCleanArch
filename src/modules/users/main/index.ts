// src/modules/users/main/index.ts
import { Uuid } from "@shared/domain/value-objects/Uuid.js";

import { PostgreUserRespository as PostgreUserRepository } from "../infra/repositories/PostgreUserRespository.js";

import { EnsureEmailNotInUse } from "../domain/services/EnsureEmailNotInUse.js";

import { CreateUserUseCase } from "../application/useCases/CreateUserUseCase.js";
import { UpdateUserUseCase } from "../application/useCases/UpdateUserUseCase.js";
import { DeleteUserUseCase } from "../application/useCases/DeleteUserUseCase.js";
import { CreateUserContoller } from "../interfaces/http/controllers/CreateUserController.js";
import { UpdateUserController } from "../interfaces/http/controllers/UpdateUserController.js";
import { DeleteUserController } from "../interfaces/http/controllers/DeleteUserController.js";



type UuidValidator = (uuid: string) => boolean;

export function buildUsersModule() {
  // Infra (idealmente singleton por módulo/app)
  const userRepository = new PostgreUserRepository();

  // Services
  const ensureEmailNotInUse = new EnsureEmailNotInUse(userRepository);
  const uuidValidator: UuidValidator = Uuid.isValid; // (sem wrapper)

  // Use cases
  const createUserUseCase = new CreateUserUseCase(userRepository, ensureEmailNotInUse);
  const updateUserUseCase = new UpdateUserUseCase(userRepository, uuidValidator, ensureEmailNotInUse);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository, uuidValidator);

  // Controllers
  const createUserController = new CreateUserContoller(createUserUseCase);
  const updateUserController = new UpdateUserController(updateUserUseCase);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return {
    createUserController,
    updateUserController,
    deleteUserController,
  };
}
