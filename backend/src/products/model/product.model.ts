import { ObjectType, Field, Int, Float } from "@nestjs/graphql"

@ObjectType()
export class Product {
    @Field()
    id!: string

    @Field()
    name!: string

    @Field(() => Float)
    price!: number

    @Field(() => Int)
    stock!: number

    @Field()
    imgUrl!: string

    @Field()
    uploadedById!: string
}