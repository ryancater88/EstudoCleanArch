import { User } from "../entities/User.js";

//Aqui eu crio o contrato de como será o repositório

export interface IUserRepository {
    save(user: User): Promise<User>
    update(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    delete(id: string): Promise<void>
}