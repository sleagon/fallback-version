# Version Fallback

[![Build Status](https://travis-ci.org/sleagon/fallback-version.svg?branch=master)](https://travis-ci.org/sleagon/fallback-version)


## Pick the best version you need.

For example, we need find out the latest version we can choose from all we got.

We have three version Chrome, saying version 40, 50, 60. We got a mission need be run some scripts in Chrome no newer than version 52. We could choose the correct version using this package.

This is just a simple example for explaining what kind job could be done by this simple package. This package is designed to solve problems like this.

## Usage

### Simple Version Fallback

```javascript
const V = new Version();
V.loadVersionMap(new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']));
const test = 'Chrome/62';
const result = V.match(test); // result [ 'Chrome', 60]
```

### Failed to match

```javascript
const V = new Version();
V.loadVersionMap(new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']));
const test = 'Safari/62';
const result = V.match(test); // result [ 'Unknown', 60]
```

### Something more complex

```javascript
const V = new Version();
V.loadVersionMap(
  new Set([
    "Jimmy's favorite browser is Chrome and version 40 is the best.",
    "Tom's favorite browser is Chrome and version 55 is the best.",
    "John's favorite browser is Safari and version 11 is the best.",
    "Cate's favorite browser is Edge and version 15 is the best.",
  ]),
  /\w+\'s favorite browser is (\w+) and version (\d+) is the best./
);
const test = "Shanyy's favorite browser is Safari and version 13 is the best.";
const result = V.match(test); // ['Safari', 11]
```

## License
MIT. See LICENSE for details.
