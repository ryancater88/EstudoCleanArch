import { IUserRepository } from "@modules/users/domain/repositories/IUserRespository.js";
import { prisma } from "../../../../shared/providers/prisma.js";
import { User } from "@modules/users/domain/entities/User.js";
import { PrismaClient } from "@prisma/client/extension";

export class PostgreUserRespository implements IUserRepository {
    private prisma: PrismaClient
    
    constructor () {
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

        if(userData) {
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

        if(userData) {
            const userEntity = new User({
                ...userData
            })

            return userEntity
        }

        return null
    }

    public async save(data: User): Promise<void> {
        await this.prisma.user.create({
            data
        })
    }

}