import { IUserRepository } from "@modules/users/domain/repositories/IUserRespository.js";
import { ICreateUserDto } from "../dtos/ICreateUserDto.js";
import { User } from "@modules/users/domain/entities/User.js";
import { EnsureEmailNotInUse } from "@modules/users/domain/services/EnsureEmailNotInUse.js";
import { IUserDto } from "../dtos/IUserDto.js";
import { UserMapper } from "../mappers/UserMapper.js";

export class CreateUserUseCase {
    private readonly userRepository: IUserRepository
    private readonly ensureEmailNotInUse: EnsureEmailNotInUse
    
    constructor(repository: IUserRepository, ensureEmailNotInUse: EnsureEmailNotInUse) {
        this.userRepository = repository
        this.ensureEmailNotInUse = ensureEmailNotInUse    
    }

    public async execute(data: ICreateUserDto): Promise<IUserDto> {
        await this.ensureEmailNotInUse.verify(data.email)
        
        const user = new User(data)
        const saveResult = await this.userRepository.save(user)

        return UserMapper.toDTO(saveResult)
    }
}