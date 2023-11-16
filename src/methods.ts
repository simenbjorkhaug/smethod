// deno-lint-ignore-file no-explicit-any ban-types
import { createMethodDecorator } from './createMethodDecorator.ts'
export const ROUTES = Symbol('ROUTES')

export class Methods {
  static getRoutes(target: Object) {
    const keys = Reflect.getMetadataKeys((target as any).prototype) as any[]

    const route_definitions = []
    for (const key of keys) {
      const metadata = Reflect.getMetadata(
        key,
        (target as any).prototype,
      ) as any

      if (metadata?.[ROUTES]) {
        route_definitions.push(metadata[ROUTES])
      }
    }

    return route_definitions
  }
}

export const Get = createMethodDecorator('GET')
export const Post = createMethodDecorator('POST')
export const Put = createMethodDecorator('PUT')
export const Delete = createMethodDecorator('DELETE')
export const Patch = createMethodDecorator('PATCH')
export const Options = createMethodDecorator('OPTIONS')
export const Head = createMethodDecorator('HEAD')
export const Trace = createMethodDecorator('TRACE')
export const Connect = createMethodDecorator('CONNECT')
