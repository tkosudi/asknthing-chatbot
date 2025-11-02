import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { systemPrompt } from './prompt';

@Injectable()
export class LangChainClient {
  private readonly llm: ChatOpenAI;

  constructor(private readonly config: ConfigService) {
    this.llm = new ChatOpenAI({
      apiKey: this.config.get<string>('OPENAI_API_KEY'),
      model: this.config.get<string>('OPENAI_MODEL', 'gpt-4o-mini'),
      temperature: 0.7,
    });
  }

  async ask(prompt: string): Promise<string> {
    const res = await this.llm.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(prompt),
    ]);

    return typeof res.content === 'string' ? res.content : JSON.stringify(res.content);
  }
}
