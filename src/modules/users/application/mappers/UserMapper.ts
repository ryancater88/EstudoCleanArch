import { User } from "@modules/users/domain/entities/User.js";
import { IUserDto } from "../dtos/IUserDto.js";

export class UserMapper {
    static toDTO(userEntity: User): IUserDto {
        return {
            nome: userEntity.nome,
            email: userEntity.email,
            id: userEntity.id
        }
    }
}