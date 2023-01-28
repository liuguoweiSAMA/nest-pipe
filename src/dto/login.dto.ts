import { IsNotEmpty } from 'class-validator'
// import { PartialType } from '@nestjs/mapped-types'
// import RegisterDto from './register.dto'
// export default class LoginDto extends PartialType(RegisterDto) {}
export default class LoginDto {
  @IsNotEmpty({ message: '账号不能为空' })
  name: string
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
