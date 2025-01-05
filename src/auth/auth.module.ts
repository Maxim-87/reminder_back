import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {UserService} from "@/user/user.service";
import {PrismaService} from "@/prisma.service";
import {JwtStrategy} from "@/auth/jwt.strategy";
import {UserModule} from "@/user/user.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "@/config/jwt.config";

@Module({
  imports: [
      UserModule,
      ConfigModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getJwtConfig
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
