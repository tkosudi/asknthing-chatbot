import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('AskNThing Chatbot API')
    .setDescription('API simples usando LangChain + NestJS + Zod')
    .setVersion('0.2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📘 Swagger UI: http://localhost:3000/docs');
}

void bootstrap();
