import { IUserRepository } from "@modules/users/domain/repositories/IUserRespository.js";
import { IUserDto } from "../dtos/IUserDto.js";
import { ErrorInvalidUserId } from "@modules/users/domain/errors/InvalidUserId.js";
import { User } from "@modules/users/domain/entities/User.js";
import { ErrorUserNotExist } from "@modules/users/domain/errors/UserNotExist.js";
import { EnsureEmailNotInUse } from "@modules/users/domain/services/EnsureEmailNotInUse.js";
import { IUpdateUserDto } from "../dtos/IUpdateUserDto.js";
import { UserMapper } from "../mappers/UserMapper.js";

type UuidValidator = (uuid: string) => boolean

export class UpdateUserUseCase {
    private readonly _repository: IUserRepository
    private readonly _uuidValidator: UuidValidator
    private readonly ensureEmailNotInUse: EnsureEmailNotInUse


    constructor(
        repository: IUserRepository,
        uuidValidator: UuidValidator,
        ensureEmailNotInUse: EnsureEmailNotInUse
    ) {
        this._repository = repository
        this._uuidValidator = uuidValidator
        this.ensureEmailNotInUse = ensureEmailNotInUse
    }

    public async execute(idUserToUpdate: string, userDataToUpdate: IUpdateUserDto): Promise<IUserDto> {
        if (!this._uuidValidator(idUserToUpdate)) {
            throw new ErrorInvalidUserId()
        }

        const userFinded = await this._repository.findById(idUserToUpdate)

        if (!userFinded) {
            throw new ErrorUserNotExist()
        }

        if (userDataToUpdate.email !== userFinded.email) {
            await this.ensureEmailNotInUse.verify(userDataToUpdate.email, idUserToUpdate)
        }

        const userEntity = new User({
            id: idUserToUpdate,
            ...userDataToUpdate
        })

        const savedEntity = await this._repository.update(userEntity)

        return UserMapper.toDTO(savedEntity)
    }

}