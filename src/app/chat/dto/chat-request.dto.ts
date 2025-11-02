import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ChatRequestSchema = z.object({
  prompt: z
    .string({
      message: "O campo 'prompt' deve ser uma string.",
    })
    .min(3, 'O prompt deve ter pelo menos 3 caracteres.'),
});

export class ChatRequestDto extends createZodDto(ChatRequestSchema) {}
