import {
  Injectable,
  ConflictException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { calculateMacros } from 'src/nutrition/utils/calculate-macros.util';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {
    this.logger.log('UserService initialized');
  }

  async create(createUserDto: CreateUserDto): Promise<{ apiKey: string }> {
    const existingUser = await this.userRepository.findByUsername(
      createUserDto.username,
    );

    if (existingUser) {
      this.logger.warn(`Username ${createUserDto.username} already exists`);
      throw new ConflictException('Username already exists');
    }

    const apiKey = uuidv4();
    const macros = calculateMacros({ ...createUserDto });

    try {
      const newUser = await this.userRepository.create({
        ...createUserDto,
        apiKey,
        macros,
      });

      return { apiKey: newUser.apiKey };
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findByApiKey(apiKey: string): Promise<User | null> {
    const user = await this.userRepository.findByApiKey(apiKey);

    return user;
  }
}
