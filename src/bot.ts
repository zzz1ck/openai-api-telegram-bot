import TelegramBot from 'node-telegram-bot-api';
import { OpenAI } from './api';

export class Bot {
  private bot: TelegramBot;

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public start() {
    console.info('[🤖] Init OpenAI api...');

    const api = new OpenAI(
      process.env.OPENAI_ORGANIZATION_ID,
      process.env.OPENAI_API_KEY,
    );

    console.info('[🤖] Awaiting for messages...');

    this.bot.on('message', async (msg: TelegramBot.Message) => {
      const chatId = msg.chat.id;

      if (
        process.env.TELEGRAM_USER_IDS
        && process.env.TELEGRAM_USER_IDS.match(String(msg.from.id))
      ) {
        this.bot.sendChatAction(chatId, 'typing');
        const reply = await api.generateText(msg.text);
        this.bot.sendMessage(chatId, reply);
      } else {
        this.bot.sendMessage(
          chatId,
          'Sorry, you are not allowed to use this bot. 🙈🙉🙊',
        );
      }
    });
  }
}
