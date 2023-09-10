import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Tweet } from '../entities/tweet.entity';

export function removeDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a tweet by its ID' }),
    ApiOkResponse({
      description: 'Successfully deleted tweet with ID',
      type: [Tweet],
    }),
    ApiBadRequestResponse({
      description: 'User not authorized or Tweet not found',
    }),
  );
}
