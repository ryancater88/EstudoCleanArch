import { ErrorUserEmailAlreadyUse } from "../errors/EmailAlreadyUse.js"
import { IUserRepository } from "../repositories/IUserRespository.js"


export class EnsureEmailNotInUse {
    private readonly _repository: IUserRepository

    constructor(repository: IUserRepository) {
        this._repository = repository
    }

    public async verify(email: string, excludeUserId?: string): Promise<void> {
        const userFindedByEmail = await this._repository.findByEmail(email.trim().toLocaleLowerCase())

        if(userFindedByEmail && excludeUserId !== userFindedByEmail.id) {
            throw new ErrorUserEmailAlreadyUse()
        }
    }
}