import {
  Controller,
  Post,
  Body,
  Get,
  // UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
