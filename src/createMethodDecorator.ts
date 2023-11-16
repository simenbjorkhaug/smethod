// deno-lint-ignore-file ban-types
import { ROUTES } from './methods.ts'

export function createMethodDecorator(method: string) {
  const as_upper_case = method.toUpperCase()

  return function Method(path: string) {
    return function (
      target: Object,
      _key: string,
      descriptor: PropertyDescriptor,
    ) {
      if (Reflect.hasMetadata(_key, target)) {
        const existing_metadata = Reflect.getMetadata(_key, target) ?? {}

        Reflect.defineMetadata(_key, {
          ...existing_metadata,
          [ROUTES]: {
            route: path,
            method: as_upper_case,
            handler: descriptor.value,
          },
        }, target)
      } else {
        Reflect.defineMetadata(_key, {
          route: path,
          method: as_upper_case,
          handler: descriptor.value,
        }, target)
      }
    }
  }
}
