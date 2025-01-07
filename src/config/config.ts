import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const configSchema = z.object({
  http: z.object({
    host: z.string(),
    port: z.preprocess((val) => Number(val), z.number())
  }),
  postgres: z.object({
    host: z.string(),
    port: z.preprocess((val) => Number(val), z.number()),
    user: z.string(),
    password: z.string(),
    db: z.string()
  }),
  jwt: z.object({
    secret: z.string()
  }),
  example: z.object({
    message: z.string()
  })
});

export type Config = z.infer<typeof configSchema>;

const parseConfig = (): Config => {
  const config = {
    http: {
      host: process.env.HTTP_HOST,
      port: process.env.HTTP_PORT
    },
    postgres: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT_INTERNAL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      db: process.env.DATABASE_NAME
    },
    jwt: {
      secret: process.env.JWT_SECRET
    },
    example: {
      message: process.env.EXAMPLE_MESSAGE
    }
  };

  const result = configSchema.safeParse(config);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error));
  }

  return result.data;
};

export const config = parseConfig();

export const devMode = process.env.NODE_ENV === 'development';
