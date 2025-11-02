import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),

  OPENAI_API_KEY: z
    .string({
      message: 'OPENAI_API_KEY é obrigatório',
    })
    .min(1, 'OPENAI_API_KEY é obrigatório'),

  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
});

export type Env = z.infer<typeof envSchema>;
