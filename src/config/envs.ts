import 'dotenv/config'
import env from 'env-var'

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DISCORD_WEBHOOK_URL: env.get('DISCORD_WEBHOOK_URL').required().asString()
}