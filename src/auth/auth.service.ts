import { BadRequestException, Injectable } from '@nestjs/common'
import { hash, verify } from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import RegisterDto from '../dto/register.dto'
import LoginDto from '../dto/login.dto'
import { user } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async register(dto: RegisterDto) {
    const password = await hash(dto.password)
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password,
      },
    })
    delete user.password
    return this.token(user)
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      },
    })
    if (!user) {
      throw new BadRequestException('用户名不存在')
    }
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码输入错误')
    } else {
      // delete user.password
      return this.token(user)
    }
  }
  async token({ name, id }: user) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }),
    }
  }
  async findAll() {
    const user = await this.prisma.user.findMany({})
    return user
  }
}
