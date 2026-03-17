import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(email: string, password: string) {
        const userExist = await this.userService.findByEmail(email);

        if (!userExist) {
            throw new NotFoundException('User not found');
        }

        const matchPassword = await bcrypt.compare(password, userExist.password);

        if (!matchPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            userId: userExist.id,
            role: userExist.role
        }

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            role: userExist.role
        }
    }
}
