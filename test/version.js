const should = require('should');
const { Version } = require('../lib');

describe('Version', function() {
  it('simple match should work.', function() {
    const V = new Version('Fake', new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']), /(\w+)\/(\d+)/);
    const test = 'Chrome/63';
    const result = V.match(test);
    should(result).deepEqual(['Chrome', 60]);
  });
  it('fallback(different family) match should work.', function() {
    const V = new Version('Fake', new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']), /(\w+)\/(\d+)/);
    const test = 'Safari/11';
    const result = V.match(test);
    should(result).deepEqual(['Fake', 0]);
  });
  it('fallback(same family) match should work.', function() {
    const V = new Version('Fake', new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']), /(\w+)\/(\d+)/);
    const test = 'Chrome/9';
    const result = V.match(test);
    should(result).deepEqual(['Fake', 0]);
  });
  it('default params match should work.', function() {
    const V = new Version();
    V.loadVersionMap(new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']));
    const test = 'Chrome/53';
    const result = V.match(test);
    should(result).deepEqual(['Chrome', 50]);
  });
  it('default params unknown match should work.', function() {
    const V = new Version();
    V.loadVersionMap(new Set(['Chrome/10', 'Chrome/50', 'Chrome/60', 'Chrome/65']));
    const test = 'Chrome/8';
    const result = V.match(test);
    should(result).deepEqual(['Unknown', 0]);
  });
  it('complicated params match should work.', function() {
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
    const test = "Shanyy's favorite browser is Chrome and version 63 is the best.";
    const result = V.match(test);
    should(result).deepEqual(['Chrome', 55]);
  });
});
