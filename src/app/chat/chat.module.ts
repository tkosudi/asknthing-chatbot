import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { LLMModule } from '../../infra/llm/llm.module';

@Module({
  imports: [LLMModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
