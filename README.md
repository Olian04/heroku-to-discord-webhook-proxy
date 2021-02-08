# heroku-to-discord-webhook-proxy

A webhook proxy, designed to restructure heroku webhooks, into discrod webhooks.

## Setup

1. Clone this project.

2. Seup heroku for the clone.

3. Configure environment variables.

4. Start dyno.


### Environment variables

#### HEROKU_WHITELIST 
A comma separated string of the heroku webhook secret that should be allowed access to the proxy

Ex: 
> `HEROKU_WHITELIST=47522f7de22154dae1e6996b6b89878a767c33299e7bbeb0bf7de962fa0f,475beb0bf7de962fb89878a767c22f7de22154dae1e6996b6b33299e7a0f`

#### DISCORD_WEBHOOK_\<NAME\> 
A discord webhook. Can be defined multiple times, however the name needs to be unique, and in uppcase.

Ex: 
> `DISCORD_WEBHOOK_PURSE_STAFF=https://discordapp.com/api/webhooks/808381391808888882/MbgCr8PJt7JbLpnaXJ8Kd3OjL1E_D0pe5of-4jvBHdEQKGgLHe4TxKVRHEYZZgSV_A36`

