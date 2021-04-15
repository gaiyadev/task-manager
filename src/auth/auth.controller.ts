import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  createUser() {
    return this.authService.createUser();
  }

  @Post('/login')
  loginUser() {
    return this.authService.loginUser();
  }
}
