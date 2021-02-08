# heroku-to-discord-webhook-proxy

A webhook proxy, designed to restructure heroku webhooks, into discrod webhooks.

## Setup

1. Clone this project.

2. Seup heroku for the clone.

3. Configure environment variables.

4. Start dyno.

5. Author a webhook (see "Configure hook using query parameters")


## Environment variables

#### HEROKU_WHITELIST 
A comma separated string of the heroku webhook secret that should be allowed access to the proxy

Ex: 
> `HEROKU_WHITELIST=47522f7de22154dae1e6996b6b89878a767c33299e7bbeb0bf7de962fa0f,475beb0bf7de962fb89878a767c22f7de22154dae1e6996b6b33299e7a0f`

#### DISCORD_WEBHOOK_\<NAME\> 
A discord webhook. Can be defined multiple times, however the name needs to be unique, and in uppcase.

Ex: 
> `DISCORD_WEBHOOK_PURSE_STAFF=https://discordapp.com/api/webhooks/808381391808888882/MbgCr8PJt7JbLpnaXJ8Kd3OjL1E_D0pe5of-4jvBHdEQKGgLHe4TxKVRHEYZZgSV_A36`
> `DISCORD_WEBHOOK_PROD_MONITORING=https://discordapp.com/api/webhooks/8076576565653882/MpnaXJ8Kd3OjL1Ee4TxKVRHE_A0re5sF-4jvBHdEQKGgLHgCr8PJt7JbLYZZgSV_A36`

## Configure hook using query parameters

| Parameter | Description | Required | Supports multiple? | Example |
|:------------:|:------------:|:-----------:|:---------------------:|:---------:|
| name         | The author name to be used for the discord message | No | No | `/?name=fooBar` |
| to              | The name of the environment variable that holds the hook to be used for this proxy. Name excludes the leading `DISCORD_WEBHOOK` and is case insensitive (however the environment variable has to be all upper case) | Yes | Yes | `/?to=purse_staff&to=prod_monitoring` |

## Usage Example

Assuming the environment variables are defined as above.

Using the following URL as a webhook:
> `myProxy.herokuapp.com/?name=sometimes-helpful&to=purse_staff&to=prod_monitoring`

Would result in two webhook requests being sent:
1. One using the hook stored in the environment variable `DISCORD_WEBHOOK_PURSE_STAFF`, using the author name "sometimes-helpful" for the discord message.
2. One using the hook stored in the environment variable `DISCORD_WEBHOOK_PROD_MONITORING`, using the author name "sometimes-helpful" for the discord message.
