import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly managerRepository: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    const create = this.managerRepository.create(body);
    return await this.managerRepository.save(create);
  }

  async findOne(query: any) {
    return await this.managerRepository.findOne({ where: query });
  }
}
