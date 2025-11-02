import { Injectable, BadRequestException } from '@nestjs/common';
import { LangChainClient } from '../../infra/llm/langchain.client';

@Injectable()
export class ChatService {
  constructor(private readonly llm: LangChainClient) {}

  async generate(prompt: string): Promise<string> {
    if (!prompt?.trim()) {
      throw new BadRequestException('Prompt cannot be empty');
    }
    return this.llm.ask(prompt);
  }
}
