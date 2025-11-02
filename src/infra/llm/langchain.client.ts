import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { systemPrompt } from './prompt';
import { MenuContextService } from '../../app/services/menu-context.service';

@Injectable()
export class LangChainClient {
  private readonly llm: ChatOpenAI;

  constructor(
    private readonly config: ConfigService,
    private readonly menuContextService: MenuContextService,
  ) {
    this.llm = new ChatOpenAI({
      apiKey: this.config.get<string>('OPENAI_API_KEY'),
      model: this.config.get<string>('OPENAI_MODEL', 'gpt-4o-mini'),
      temperature: 0.7,
    });
  }

  async ask(prompt: string): Promise<string> {
    try {
      const context = this.menuContextService.buildContext();

      const res = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(`Contexto:\n${context}\n\nPergunta:\n${prompt}`),
      ]);

      return typeof res.content === 'string' ? res.content : JSON.stringify(res.content);
    } catch (error) {
      console.error('❌ Error while asking the LLM:', error);
      throw new InternalServerErrorException(
        'Failed to get response from the language model.',
      );
    }
  }
}
