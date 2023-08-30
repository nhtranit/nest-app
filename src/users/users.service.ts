import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(data: CreateUserDto): Promise<Users> {
    const { username, email, password } = data;
    const user = new Users();

    user.username = username;
    user.email = email;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async deleteUser(users: any): Promise<void> {
    const userToDelete = await this.usersRepository.findOne({
      where: {
        id: users.id,
      },
    });

    if (!userToDelete) {
      throw new Error('User not found');
    }

    await this.usersRepository.remove(userToDelete);
  }

  async findOneByUsername(username: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
