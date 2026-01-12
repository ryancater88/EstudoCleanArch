import { IUserRepository } from "@modules/users/domain/repositories/IUserRespository.js";
import { ICreateUserRequestDto } from "../dtos/ICreateUserDto.js";
import { ErrorUserEmailAlreadyUse } from "@modules/users/domain/errors/EmailAlreadyUse.js";
import { User } from "@modules/users/domain/entities/User.js";

export class CreateUserUseCase {
    private readonly userRepository: IUserRepository
    
    constructor(repository: IUserRepository) {
        this.userRepository = repository    
    }

    public async execute(data: ICreateUserRequestDto): Promise<void> {
        const userAlreadyExist = await this.userRepository.findByEmail(data.email)

        if(userAlreadyExist) {
            throw new ErrorUserEmailAlreadyUse()
        }

        const user = new User(data)

        await this.userRepository.save(user)
    }
}