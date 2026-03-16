import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class UserCreateResponse {
    @Field()
    id!: string

    @Field()
    email!: string

    @Field()
    role!: string
}