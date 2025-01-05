import {JwtAuthGuard} from "@/auth/guards/jwt.guard";
import {UseGuards} from "@nestjs/common";

export const Auth = () => UseGuards(JwtAuthGuard)
