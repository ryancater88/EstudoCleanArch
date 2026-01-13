import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

type Env = {
  DATABASE_URL: string
}

export default defineConfig({
  schema: `src/shared/providers/prisma/schema.prisma`,
  migrations: { path: `src/shared/providers/prisma/migrations` },
  datasource: { url: env<Env>('DATABASE_URL') },
  
})
