import { envs } from "../../config/index.js"

export class DiscordService {
    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL
    constructor() {}

    async notify(message: string) {
        const body = {
            content: message,
            // embeds: [
            //     {
            //         image: {url: 'https://giphy.com/gifs/math-lady-meme-WRQBXSCnEFJIuxktnw'}
            //     }
            // ]
        }

        const response = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })

        if(!response.ok) {
            console.log('Error sending message to discord')
            return false
        }
        return true
    }


}