# set-cookie-parser-es

[![bundle size](https://flat.badgen.net/bundlephobia/minzip/set-cookie-parser-es)](https://bundlephobia.com/package/set-cookie-parser-es)

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