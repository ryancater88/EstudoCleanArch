import { ErrorInvalidUserId } from "@modules/users/domain/errors/InvalidUserId.js";
import { ErrorUserNotExist } from "@modules/users/domain/errors/UserNotExist.js";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRespository.js";

type UuidValidator = (uuid: string) => boolean

export class DeleteUserUseCase {
    private _repository: IUserRepository
    private _UuidValidator: UuidValidator

    constructor(userRepository: IUserRepository, uuidValidator: UuidValidator) {
        this._repository = userRepository
        this._UuidValidator = uuidValidator
    }

    public async execute(userId: string): Promise<void> {
        if (!this._UuidValidator(userId)) {
            throw new ErrorInvalidUserId()
        }

        const userFinded = await this._repository.findById(userId)

        if(!userFinded) {
            throw new ErrorUserNotExist()
        }

        await this._repository.delete(userId)
    }
}