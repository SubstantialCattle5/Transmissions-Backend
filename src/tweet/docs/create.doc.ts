import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateTweetDto } from '../dto';
import { Tweet } from '../entities/tweet.entity';

export function createDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new tweet' }),
    ApiBody({ type: CreateTweetDto }),
    ApiOkResponse({
      status: 201,
      description: 'Successfully created a new tweet',
      type: Tweet,
    }),
    ApiBadRequestResponse({ description: 'User not found' }),
  );
}
