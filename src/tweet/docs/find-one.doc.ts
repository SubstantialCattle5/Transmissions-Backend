import { applyDecorators } from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

export function findOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve a single tweet by its ID' }),
    ApiOkResponse({ description: 'Found tweet with ID', type: Tweet }),
  );
}
