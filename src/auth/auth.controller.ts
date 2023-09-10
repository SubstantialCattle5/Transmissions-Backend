import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, ValidateDto } from './dto';
import { registerDoc, validateDoc, authDoc } from './docs';

@authDoc()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @registerDoc()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @validateDoc()
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate(@Body() validateDto: ValidateDto) {
    return this.authService.validate(validateDto);
  }
}
