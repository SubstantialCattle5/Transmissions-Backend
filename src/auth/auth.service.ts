import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto, ValidateDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly manager: EntityManager,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const pwHash = await argon.hash(registerDto.password);
      const user = this.userRepository.create({
        username: registerDto.username,
        password: pwHash,
      });
      await this.manager.save(user);
      return {
        username: user.username,
        createdAt: user.created_at,
        id: user.id,
      };
    } catch (error) {
      if (error.code === '23505') {
        // This is the code for a unique constraint violation in PostgreSQL
        throw new ConflictException('A user with this username already exists');
      } else {
        throw new InternalServerErrorException(
          error.message || 'An unknown error occurred',
        );
      }
    }
  }

  async validate(validateDto: ValidateDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: validateDto.username,
        },
      });
      if (!user) {
        throw new ConflictException('A user with this username does not exist');
      }
      const pwValid = await argon.verify(user.password, validateDto.password);
      if (!pwValid) {
        throw new ConflictException('Invalid password');
      }
      return {
        username: user.username,
        createdAt: user.created_at,
        id: user.id,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An unknown error occurred',
      );
    }
  }
}
