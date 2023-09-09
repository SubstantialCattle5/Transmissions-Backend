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
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly manager: EntityManager,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const pwHash = await argon.hash(registerDto.password);
      const user = this.userRepository.create({
        username: registerDto.username,
        password: pwHash,
      });
      await this.manager.save(user);
      return await this.signToken(user.id, user.username);
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
      return this.signToken(user.id, user.username);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An unknown error occurred',
      );
    }
  }

  async signToken(
    id: string,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      username,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
