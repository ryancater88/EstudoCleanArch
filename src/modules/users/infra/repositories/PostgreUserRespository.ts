import { IUserRepository } from "@modules/users/domain/repositories/IUserRespository.js";
import { prisma } from "../../../../shared/providers/prisma.js";
import { User } from "@modules/users/domain/entities/User.js";

export class PostgreUserRespository implements IUserRepository {
    private prisma: typeof prisma

    constructor() {
        this.prisma = prisma
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        const userData = await this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userData) {
            const userEntity = new User({
                ...userData
            })

            return userEntity
        }

        return null
    }

    public async findById(id: string): Promise<User | null> {
        const userData = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (userData) {
            const userEntity = new User({
                ...userData
            })

            return userEntity
        }

        return null
    }

    public async save(data: User): Promise<User> {
        const saveResult = await this.prisma.user.create({
            data
        })

        const userEntity = new User({ ...saveResult })
        return userEntity
    }

    public async update(data: User): Promise<User> {
        const updateResult = await this.prisma.user.update({
            data: {
                ...data,
                id: undefined
            },
            where: {
                id: data.id
            }
        })

        const userEntity = new User({ ...updateResult })
        return userEntity
    }

}