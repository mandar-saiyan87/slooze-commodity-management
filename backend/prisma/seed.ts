import { PrismaClient } from "./src/generated/prisma/client";
import * as bcrypt from "bcrypt";
import 'dotenv/config'
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)


const prisma = new PrismaClient({ adapter });

async function main() {
    // check if manager exist
    const managerexists = await prisma.user.findFirst({
        where: {
            role: 'MANAGER'
        }
    })

    if (managerexists) {
        console.log('Manager exists, skippping creation')
        return
    }

    const password = await bcrypt.hash('manager123##', 10)

    await prisma.user.create({
        data: {
            email: 'manager@test.com',
            password,
            role: 'MANAGER'
        }
    })

    console.log('Manager created successfully')


}

main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(async () => await prisma.$disconnect())