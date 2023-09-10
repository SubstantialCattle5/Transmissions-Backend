import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ValidateDto } from '../dto';

export function validateDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Validate a user' }),
    ApiBody({ type: ValidateDto }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully validated.',
    }),
    ApiResponse({
      status: 409,
      description:
        'A user with this username does not exist or invalid password.',
    }),
    ApiResponse({ status: 500, description: 'An unknown error occurred.' }),
  );
}
