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
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            userId: user.id,
            role: user.role
        }

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            role: user.role
        }
    }
}
