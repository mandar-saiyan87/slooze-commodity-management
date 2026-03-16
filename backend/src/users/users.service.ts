import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { Role } from '../../prisma/src/generated/prisma/enums';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async createStoreKeeper(email: string, password: string) {

        const userExist = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userExist) {
            throw new ConflictException('User already exist')
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        {
            return this.prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    role: Role.STORE_KEEPER
                }

            })
        }
    }
}
