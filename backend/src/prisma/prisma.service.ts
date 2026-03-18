import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config'


// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
//     async onModuleInit() {
//         await this.$connect();
//     }
//     async onModuleDestroy() {
//         await this.$disconnect();
//     }
// }


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(private configService: ConfigService) {

        const adapter = new PrismaNeon({
            connectionString: configService.get<string>('DATABASE_URL')
        })
        // const adapter = new PrismaNeon({
        //     connectionString: configService.get<string>('DATABASE_URL')
        // })
        super({ adapter })
    }

    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

}


