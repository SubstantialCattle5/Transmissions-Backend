import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
