import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {

    constructor(private prisma: PrismaService) { }

    async getall() {
        return this.prisma.product.findMany();
    }
}
