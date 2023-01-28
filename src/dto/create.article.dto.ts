import { IsNotEmpty, Length } from 'class-validator'

export default class CreateArticleDto {
  //经过这个函数的时候 不能为空 为空抛出异常
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(10, 100, { message: '标题不能少于十个字' })
  title: string
  @IsNotEmpty({ message: '内容不能为空' })
  content: string
}
