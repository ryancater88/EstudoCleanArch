import { IUserRepository } from "@modules/users/domain/repositories/IUserRespository.js"
import { EnsureEmailNotInUse } from "@modules/users/domain/services/EnsureEmailNotInUse.js"

export default class GetUserUseCase {
    private readonly userRepository: IUserRepository

    constructor(repository: IUserRepository) {
        this.userRepository = repository
    }

    public async execute(data: ICreateUserDto): Promise<IUserDto> {
        await this.ensureEmailNotInUse.verify(data.email)

        const user = new User(data)
        const saveResult = await this.userRepository.save(user)

        return UserMapper.toDTO(saveResult)
    }
}