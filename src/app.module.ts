import { Module } from '@nestjs/common';
import { ChatModule } from './app/chat/chat.module';
import { AppConfigModule } from './shared/config/config.module';

@Module({
  imports: [AppConfigModule, ChatModule],
})
export class AppModule {}
