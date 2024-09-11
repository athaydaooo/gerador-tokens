#### Source: [Express async/await error handling](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/#usinges7asyncawait)

## Lidando com os erros em promisses
Por padrão (no JS) o Express não consegue lidar automaticamente com erros em funções async, como no `userController`.
Para que ele possa retornar o erro corretamente no Router, precisamos informar ao parâmetro `next`(ou o terceiro parâmetro) da função do router.
Exemplo:

```MJS

```

## Wrapper
Facilitando nossa vida, podemos definir um wrapper, que ao realizar um catch, retorna o terceiro arg (o  `next` da função do router) automaticamente para o próprio router.

```MJS
let wrapper =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2])

let wrapper =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2])

const router = Router()

router.get('/', wrapper(function))
```

*Obs.: a function por pardrão sempre recebe os args `res, req, next`, no caso apenas os omitimos na declaração*