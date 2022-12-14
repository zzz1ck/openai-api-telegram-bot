import TelegramBot from 'node-telegram-bot-api';
import { OpenAI } from './api';

export class Bot {
  private bot: TelegramBot;

  private api: OpenAI;

  private userIds: string;

  constructor(token: string, userIds: string) {
    this.userIds = userIds;
    this.bot = new TelegramBot(token, { polling: true });
    this.api = new OpenAI(
      process.env.OPENAI_ORGANIZATION_ID,
      process.env.OPENAI_API_KEY,
    );
  }

  private isAllowed(userId: number) {
    return (
      !this.userIds || (this.userIds && this.userIds.match(String(userId)))
    );
  }

  private async handleMessage(msg: TelegramBot.Message) {
    const {
      chat: { id: chatId },
      from: { id: userId },
    } = msg;

    if (this.isAllowed(userId)) {
      this.bot.sendChatAction(chatId, 'typing');
      const reply = await this.api.generateText(msg.text);
      this.bot.sendMessage(chatId, reply);
    } else {
      this.bot.sendMessage(
        chatId,
        'Sorry, you are not allowed to use this bot. 🙈🙉🙊',
      );
    }

    // const lol = await this.api.listModels();

    // console.log(lol.data.map((model) => model.id));
  }

  public start() {
    console.info('[🤖] Awaiting for messages...');
    // this.bot.on('message', (msg: TelegramBot.Message) => this.handleMessage(msg));

    this.bot.on('text', (msg: TelegramBot.Message) => this.handleMessage(msg));

    // this.bot.on('voice', (msg: TelegramBot.Message) => console.log('[voice]', msg));

    // this.bot.on('text', (msg: TelegramBot.Message) => console.log('[photo]', msg));

    // process images/stickers with dall-e;
    // process audio with transcription ai;
  }
}
