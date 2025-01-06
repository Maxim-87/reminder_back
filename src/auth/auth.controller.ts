import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from "./dto/auth.dto";
import {Request, Response} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe()) // подключаем чтобы работала валидация
  @HttpCode(200) // явно указываем какой метод будет приходить в ответе
  @Post('Login') // добавляет /login в адрес запроса (http://host/api/auth/login)
  async login(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {
    const {refreshToken, ...response} = await this.authService.login(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response;
  }

  @UsePipes(new ValidationPipe()) // подключаем чтобы работала валидация
  @HttpCode(200) // явно указываем какой метод будет приходить в ответе
  @Post('registration') // добавляет /login в адрес запроса (http://host/api/auth/login)
  async registration(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {
    const {refreshToken, ...response} = await this.authService.registration(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response;

  }

  @HttpCode(200) // явно указываем какой метод будет приходить в ответе
  @Post('login/access-token') // добавляет /login в адрес запроса (http://host/api/auth/login)
  async getNewTokens(@Req() req: Request,@Res({passthrough: true}) res: Response) {
    const refreshTokenFromCookie = req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookie) {
      this.authService.removeRefreshTokenToResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const {refreshToken, ...response} = await this.authService.getNewTokens(refreshTokenFromCookie)

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }


  @HttpCode(200) // явно указываем какой метод будет приходить в ответе
  @Post('Logout') // добавляет /login в адрес запроса (http://host/api/auth/login)
  async logout(@Res({passthrough: true}) res: Response) {
    this.authService.removeRefreshTokenToResponse(res)

    return true;
  }

}
