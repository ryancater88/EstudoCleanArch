import { DeleteUserUseCase } from "@modules/users/application/useCases/DeleteUserUseCase.js"
import { PostgreUserRespository } from "@modules/users/infra/repositories/PostgreUserRespository.js"
import { DeleteUserController } from "@modules/users/interfaces/http/deleteUser/DeleteUserController.js"
import { Uuid } from "@shared/domain/value-objects/Uuid.js"

export default function makeDeleteUserController(): DeleteUserController {
    const uuidValidator = Uuid.isValid
    const userRepository = new PostgreUserRespository()
    const useCase = new DeleteUserUseCase(userRepository, uuidValidator)
    const controller = new DeleteUserController(useCase)
    return controller
}