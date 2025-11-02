import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@ApiTags('Chat')
@Controller('v1/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiBody({ type: ChatRequestDto })
  @ApiResponse({ status: 200, description: 'Resposta gerada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Prompt inválido ou ausente.' })
  async handleChat(@Body() body: ChatRequestDto) {
    const output = await this.chatService.generate(body.prompt);
    return { output };
  }
}
