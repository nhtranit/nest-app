import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<Users> {
    return this.usersService.create(user.username, user.email);
  }

  @Get()
  async findAllUsers(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post('delete')
  async deleteUser(@Body() data: Users): Promise<void> {
    return this.usersService.deleteUser(data);
  }
}
