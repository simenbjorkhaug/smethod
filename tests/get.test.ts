import 'npm:@bjorkhaug/sreflect'
import { Get, Methods, Post, Put } from '../mod.ts'
import { assert } from 'https://deno.land/std@0.206.0/assert/mod.ts'

Deno.test('get', () => {
  class TestController {
    @Get('/')
    async method() {
      await Promise.resolve(console.log('Hello world'))
    }

    @Post('/signup')
    async signup() {}

    @Put('/update')
    async update() {}
  }

  const routes = Methods.getRoutes(TestController)

  assert(routes.length === 3)
  assert(routes[0].route === '/')
  assert(routes[0].method === 'GET')
  assert(typeof routes[0].handler === 'function')
  assert(routes[1].route === '/signup')
  assert(routes[1].method === 'POST')
  assert(typeof routes[1].handler === 'function')
  assert(routes[2].route === '/update')
  assert(routes[2].method === 'PUT')
  assert(typeof routes[2].handler === 'function')
})
