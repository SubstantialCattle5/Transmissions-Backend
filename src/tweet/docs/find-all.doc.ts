import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Tweet } from '../entities/tweet.entity';

export function findAll() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all tweets' }),
    ApiOkResponse({ description: 'Found tweets', type: [Tweet] }),
  );
}
