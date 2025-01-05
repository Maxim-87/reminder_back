import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe()) // подключаем чтобы работала валидация
  @HttpCode(200) // явно указываем какой метод будет приходить в ответе
  @Post('Login') // добавляет /login в адрес запроса (http://host/api/auth/login)
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }
}
