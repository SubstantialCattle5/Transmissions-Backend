import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UpdateTweetDto } from '../dto';
import { Tweet } from '../entities/tweet.entity';

export function updateDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a tweet by its ID' }),
    ApiBody({ type: UpdateTweetDto }),
    ApiOkResponse({
      description: 'Successfully updated tweet with ID',
      type: Tweet,
    }),
    ApiBadRequestResponse({
      description: 'User not authorized or Tweet not found',
    }),
  );
}
