import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { LangChainClient } from '../../infra/llm/langchain.client';

@Module({
  controllers: [ChatController],
  providers: [ChatService, LangChainClient],
})
export class ChatModule {}
