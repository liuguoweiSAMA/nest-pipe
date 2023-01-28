import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import LoginDto from 'src/dto/login.dto'
import RegisterDto from '../dto/register.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    // console.log(dto)
    return this.auth.register(dto)
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto)
  }
  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  all(@Req() req: Request) {
    return req
  }
}
