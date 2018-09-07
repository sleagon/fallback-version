# Version Fallback

[![Build Status](https://travis-ci.org/sleagon/fallback-version.svg?branch=master)](https://travis-ci.org/sleagon/fallback-version)

[英文版](Readme.md)

## 匹配最适合的版本号

我们有时候会有需求去根据现在的版本集合选择合适的版本去干某件任务。比如，我们有三个版本的Chrome浏览器，40、50、60版本，这时候我们接到一个任务：需要在不高于52的Chrome版本上跑一些脚本。这时候我们就可以用这个包来进行匹配了。这个包就是被设计来解决类似的场景下的问题的。

## 用法

```bash
npm install fallback-version --save
# or
yarn add fallback-version
```

### 简单用法

```javascript
const { Version } = require('fallback-version');
const V = new Version();
V.loadVersionMap(new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']));
const test = 'Chrome/62';
const result = V.match(test); // result [ 'Chrome', 60]
```

### 没匹配到合适的版本

```javascript
const { Version } = require('fallback-version');
const V = new Version();
V.loadVersionMap(new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']));
const test = 'Safari/62';
const result = V.match(test); // result [ 'Unknown', 60]
```

### 复杂场景

```javascript
const { Version } = require('fallback-version');
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

### 带参初始化
```javascript
const { Version } = require('fallback-version');
const V = new Version('Fake', new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']), /(\w+)\/(\d+)/);
const test = 'Chrome/9';
const result = V.match(test); // ['Fake', 0]
```

更多用法可以看测试用例或者直接看源码。

## License
MIT. See LICENSE for details.
