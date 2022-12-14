import * as dotenv from 'dotenv';
import { Bot } from './bot';

dotenv.config();

const assistant = new Bot(process.env.TELEGRAM_BOT_TOKEN);

assistant.start();
