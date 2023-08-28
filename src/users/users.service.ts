// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(username: string, email: string): Promise<Users> {
    const user = new Users();
    user.username = username;
    user.email = email;
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
}
