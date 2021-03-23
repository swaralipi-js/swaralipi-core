# swaralipi-core

[![npm version](https://img.shields.io/npm/v/swaralipi-core.svg)](https://www.npmjs.com/package/swaralipi-core)
[![bundle size](https://img.shields.io/bundlephobia/min/swaralipi-core.svg)](https://bundlephobia.com/result?p=swaralipi-core)

A library to convert Western music notation to Indian notation ([Swaralipi](https://en.wikipedia.org/wiki/Swaralipi))

## Installing

```
npm i swaralipi-core
```

Alternatively, you can download the UMD build from [unpkg](https://unpkg.com/swaralipi-core)

## Usage

Use the library in `<script>` tag

```html
<script src="https://unpkg.com/swaralipi-core"></script>
<script>
    let swaralipi = new SwaralipiCore();
    swaralipi.toIndianNote("C4"); // Returns সা (Sa)
    swaralipi.toIndianNote("D4"); // Returns রা (Re)
</script>
```

Import and use the library as module:

```js
import SwaralipiCore from "swaralipi-core"

// Default configuration (scale:C, Octave: 4, lang:bn)
let swaralipi = new SwaralipiCore();
swaralipi.toIndianNote("C4"); // Returns সা (Sa)
swaralipi.toIndianNote("D4"); // Returns রা (Re)

// Provide parameter:
let scale = "C#"; // All Major scales are supported
let octave = "3"; // Octave
let lang = "bn"; // Only Bengali (bn) and Hindi (hi) are supported

let swaralipi = new SwaralipiCore(scale, octave, lang);

swaralipi.toIndianNote("C#3"); // Returns সা (Sa)
swaralipi.toIndianNote("D#3"); // Returns রা (Re)

</script>
```

## Author
[Palash Bhowmick](https://www.linkedin.com/in/palashbhowmick/)

## License
[MIT](https://github.com/swaralipi-js/swaralipi-core/blob/main/LICENSE)