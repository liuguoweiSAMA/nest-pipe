import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
//class-validator 验证规则的包
import { validate } from 'class-validator'
@Injectable()
export class HdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log(metadata.metatype);
    const object = plainToInstance(metadata.metatype, value)
    const errors = await validate(object)
    if (errors.length) {
      // throw new BadRequestException('表单验证错误');
      const messages = errors.map((error) => ({
        name: error.property,
        message: Object.values(error.constraints).map((v) => v),
      }))
      throw new HttpException(messages, HttpStatus.UNPROCESSABLE_ENTITY)
    }
    // console.log(object);
    // console.log(errors);
    // throw new BadRequestException('参数错误');
    // return metadata.metatype == Number ? +value : value;
    return value
  }
}
