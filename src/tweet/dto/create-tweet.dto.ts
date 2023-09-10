import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the tweet',
    type: String,
  })
  content: string;
}
