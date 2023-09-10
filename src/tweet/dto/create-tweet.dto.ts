import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
