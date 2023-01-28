import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
@ValidatorConstraint()
export class IsConfirmed implements ValidatorConstraintInterface {
  async validate(value: any, args?: ValidationArguments) {
    return value === args.object[args.property + '_confirmed']
  }
  defaultMessage(args?: ValidationArguments): string {
    return '比对失败'
  }
}
