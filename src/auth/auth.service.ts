// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private async comparePasswords(
    userPassword: string,
    currentPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userPassword, currentPassword);
  }

  private async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await this.comparePasswords(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(body: LoginDto) {
    const existUser = await this.validateUser(body.username, body.password);
    if (!existUser) {
      throw new UnauthorizedException();
    }
    const payload = { username: existUser.username, sub: existUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
