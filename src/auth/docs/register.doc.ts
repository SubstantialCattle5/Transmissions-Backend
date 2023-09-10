import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from '../dto';

export function registerDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiBody({ type: RegisterDto }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
    }),
    ApiResponse({
      status: 409,
      description: 'A user with this username already exists.',
    }),
    ApiResponse({ status: 500, description: 'An unknown error occurred.' }),
  );
}
