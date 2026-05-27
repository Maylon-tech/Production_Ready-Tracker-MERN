import { config } from 'dotenv'
import dotenv from 'dotenv'
dotenv.config()

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRETE,
    JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY
} = process.env