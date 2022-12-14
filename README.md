OpenAI API Telegram Bot
==================

[![Generic badge](https://img.shields.io/badge/node-16.14.0-blue.svg)](https://nodejs.org) [![Generic badge](https://img.shields.io/badge/npm-9.2.0-green.svg)](https://www.npmjs.com/) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zzz1ck/openai-api-telegram-bot/blob/main/LICENSE) [![Donate](https://img.shields.io/badge/Donate-Crypto-green.svg)](https://web3.bio/zz1ck.near)

This [TypeScript](https://www.typescriptlang.org/) telegram wrapper is a app for interacting with OpenAI GPT-3, the powerful natural language processing model. It allows users to easily send messages to GPT-3 and receive responses, enabling them to explore the capabilities of the model and create interesting conversations. The wrapper also provides an easy way to integrate GPT-3 into Telegram bots, allowing developers to create more engaging and interactive chatbot experiences (as per `text-davinci-003`).

## Installation

App requires [Node.js](https://nodejs.org/) v16.14+ or [Docker](https://www.docker.com/).

For proper work you need to fill the environment variables. Rename the `.env.example` file, simply open the file in a text editor and save it with a new name.
> **Note**
> Use `.env` or `.env.*` for new filename.

To fill the variables, open the newly renamed file in a text editor and add the following variables:

* `OPENAI_API_KEY`: This is the API key for your OpenAI account.

* `OPENAI_ORGANIZATION_ID`: This is the ID of your OpenAI organization.

* `TELEGRAM_BOT_TOKEN`: This is the token for your Telegram bot.

* `TELEGRAM_USER_ID`: This is the ID of the user you want to send messages to.

Once you have added the variables, save the file, install dependencies with `npm i` and you are ready to go 🥳.

## Usage

To begin using the bot, execute command - `npm run watch` or if using Docker - `docker-compose up`.

Have fun! <3
