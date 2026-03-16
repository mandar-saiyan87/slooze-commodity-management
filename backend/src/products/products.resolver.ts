import { Resolver, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductResponse } from './model/product.model';


@Resolver()
export class ProductsResolver {
    constructor(private productsService: ProductsService) { }

    @Query(() => [ProductResponse], { nullable: true, name: 'products' })
    async products() {
        return this.productsService.getall();
    }

}
