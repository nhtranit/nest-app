import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// middleware
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { CorsMiddleware } from './common/middlewares/cors/cors.middleware';
import { HelmetMiddleware } from './common/middlewares/helmet/helmet.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FormatResponseInterceptor } from './common/interceptors/format-response/format-response.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '11010',
      database: 'nestapp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, CorsMiddleware, HelmetMiddleware)
      .forRoutes('*'); // Áp dụng middleware cho tất cả các yêu cầu
  }
}
