import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { PrismaClient } from '@prisma/client'

export function IsNotExistsRule(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNotExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const prisma = new PrismaClient()
          console.log(propertyName, args.value, table)
          const user = await prisma[table].findFirst({
            where: {
              //   变量用[] 否贼默认认为是字符串propertyName
              [propertyName]: args.value,
            },
          })
          //   return value === args.object[value].
          //   console.log(value, args)
          return !Boolean(user)
        },
      },
    })
  }
}
