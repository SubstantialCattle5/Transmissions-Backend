import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export * from './register.doc';
export * from './validate.doc';

export function authDoc() {
  return applyDecorators(ApiTags('auth'));
}
