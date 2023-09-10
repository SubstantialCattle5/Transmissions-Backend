import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export * from './registerDoc';
export * from './validateDoc';

export function authDoc() {
  return applyDecorators(ApiTags('auth'));
}
