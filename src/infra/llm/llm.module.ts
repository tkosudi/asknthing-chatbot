import { Module } from '@nestjs/common';
import { LangChainClient } from './langchain.client';
import { MenuContextService } from '../../app/services/menu-context.service';
import { MenuRepository } from '../repositories/menu.repository';

@Module({
  providers: [LangChainClient, MenuContextService, MenuRepository],
  exports: [LangChainClient],
})
export class LLMModule {}
