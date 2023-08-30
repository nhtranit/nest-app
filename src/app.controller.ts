import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  // @UseGuards(ThrottlerGuard) // use this for specific ThrottlerGuard
  // @Throttle(10, 60)
  getHello(): string {
    return this.appService.getHello();
  }
}
