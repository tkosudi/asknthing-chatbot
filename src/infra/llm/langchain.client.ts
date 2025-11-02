import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class LangChainClient {
  private readonly llm: ChatOpenAI;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    const model = this.config.get<string>('OPENAI_MODEL', 'gpt-4o-mini');

    console.log('🔑 OPENAI_API_KEY:', apiKey?.slice(0, 7) ?? '(undefined)');

    this.llm = new ChatOpenAI({ apiKey, model });
  }

  async ask(prompt: string): Promise<string> {
    const res = await this.llm.invoke(prompt);
    return typeof res.content === 'string' ? res.content : JSON.stringify(res.content);
  }
}
