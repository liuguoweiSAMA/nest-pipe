import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaClient } from '@prisma/client'
import { HdPipe } from './hd.pipe'
import CreateArticleDto from './dto/create.article.dto'

@Controller()
export class AppController {
  prisma: PrismaClient
  constructor(private readonly appService: AppService) {
    this.prisma = new PrismaClient()
  }

  @Get()
  // ParseIntPipe
  // 默认值是1 new DefaultValuePipe(1)
  getHello(@Param('id', new DefaultValuePipe(1), HdPipe) id: number) {
    return this.prisma.article.findUnique({
      where: {
        id: id,
      },
    })
  }
  @Post('store')
  // HdPipe 这是自己的过滤器
  add(@Body() dto: CreateArticleDto) {
    return dto
  }
}
