# set-cookie-parser-es

[![npm version][npm-version-src]][npm-version-href]
[![Codecov][codecov-src]][codecov-href]
[![bundle][bundle-src]][bundle-href]

ESM build of [set-cookie-parser](https://www.npmjs.com/package/set-cookie-parser) with bundled types. Accepts a single set-cookie header value or an array of set-cookie header. 

☝🏻 Unlike the original "set-cookie-parser":
- this library doesn't accept Node.js response object, in order to be framework/runtime agnostic.
- `splitCookiesString` accepts set-cookie string only.

## Usage

Install:

```sh
# npm
npm i set-cookie-parser-es

# yarn
yarn add set-cookie-parser-es
```

Import:

```js
// ESM
import { parse, parseString, splitCookiesString } from 'set-cookie-parser-es'

// CommonJS
const { parse, parseString, splitCookiesString } = require('set-cookie-parser-es')
```

## License

[MIT](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/set-cookie-parser-es?style=flat-square
[npm-version-href]: https://npmjs.com/package/set-cookie-parser-es

[codecov-src]: https://img.shields.io/codecov/c/gh/enkot/set-cookie-parser-es/main?style=flat-square
[codecov-href]: https://codecov.io/gh/enkot/set-cookie-parser-es

[bundle-src]: https://img.shields.io/bundlephobia/minzip/set-cookie-parser-es?style=flat-square
[bundle-href]: https://bundlephobia.com/result?p=set-cookie-parser-es