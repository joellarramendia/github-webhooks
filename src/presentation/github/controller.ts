import { Request, Response } from 'express'
import { GitHubService } from '../services/github.service.js'
import { DiscordService } from '../services/discord.service.js'

export class GithubController {
    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ) { }

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknow'
        const payload = req.body
        let message: string

        // console.log(JSON.stringify(payload))
        switch (githubEvent) {
            case 'star':
                message = this.githubService.onStar(payload)
                break

            case 'issues':
                message = this.githubService.onIssue(payload)
                break

            default:
                message = `Unknown event ${githubEvent}`
        }
        this.discordService.notify(message)
            .then(() => res.status(202).send('Accepted'))
            .catch(() => res.status(500).json({error: 'Internal server error'}))

    }
}