import { CreateUserUseCase } from "@modules/users/application/useCases/CreateUserUseCase.js";
import { PostgreUserRespository } from "@modules/users/infra/repositories/PostgreUserRespository.js";
import { CreateUserContoller } from "@modules/users/interfaces/http/createUser/CreateUserController.js";


export function makeCreateUserController() {
    const userRepository = new PostgreUserRespository()
    const createUserUseCase = new CreateUserUseCase(userRepository);
    return new CreateUserContoller(createUserUseCase);
}
