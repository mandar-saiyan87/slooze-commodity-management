import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const rolerequired = this.reflector.get<string[]>('Roles', context.getHandler())

        if (!rolerequired) {
            return true
        }
        // const req = context.switchToHttp().getRequest()

        // const user = req.user
        const ctx = GqlExecutionContext.create(context)
        const user = ctx.getContext().req.user
        return rolerequired.includes(user?.role)
    }
}