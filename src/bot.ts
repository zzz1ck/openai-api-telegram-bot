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

  private isAllowed(uid: number) {
    return !this.userIds || this.userIds.includes(String(uid));
  }

  private async handleMessage(msg: TelegramBot.Message) {
    const {
      text = '',
      chat: { id: cid },
      from: { id: uid },
    } = msg;

    if (text.match(/^\/start/g)) {
      this.bot.sendMessage(cid, 'Assistant has successfully started! 🥳');
    } else if (this.isAllowed(uid)) {
      this.bot.sendChatAction(cid, 'typing');
    } else {
      this.bot.sendMessage(
        cid,
        'Sorry, you are not allowed to use this bot. 🙈🙉🙊',
      );
    }
  }

  private async handleTextMessage(msg: TelegramBot.Message) {
    const {
      text,
      chat: { id: cid },
      from: { id: uid },
    } = msg;

    if (this.isAllowed(uid)) {
      const reply = await this.api.generateText(text);
      this.bot.sendMessage(cid, reply);
    }
  }

  private async handleDocumentMessage(msg: TelegramBot.Message) {
    const {
      chat: { id: cid },
      from: { id: uid },
      document: { file_id: fid },
    } = msg;

    if (this.isAllowed(uid)) {
      const file = await this.bot.getFile(fid);

      if (file.file_path.endsWith('.png')) {
        const fileStream = await this.bot.getFileStream(fid);
        const reply = await this.api.generateImageVariation(fileStream);

        if (typeof reply === 'string') {
          this.bot.sendMessage(cid, reply);
        } else {
          this.bot.sendPhoto(cid, reply.data[0].url);
        }
      } else {
        this.bot.sendMessage(cid, '⚠️ Unsupported file type, use .png instead!');
      }
    }
  }

  public start() {
    console.info('[🤖] Awaiting for messages...');
    this.bot.on('message', (msg: TelegramBot.Message) => this.handleMessage(msg));
    this.bot.on('text', (msg: TelegramBot.Message) => this.handleTextMessage(msg));
    this.bot.on('document', (msg: TelegramBot.Message) => this.handleDocumentMessage(msg));
  }
}
