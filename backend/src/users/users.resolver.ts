import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserCreateResponse } from './model/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../prisma/src/generated/prisma/enums';



@Resolver()
export class UsersResolver {

    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.MANAGER])
    @Mutation(() => UserCreateResponse)
    async createUser(@Args('data') data: CreateUserInput) {
        return this.usersService.createStoreKeeper(data.email, data.password);
    }

}
