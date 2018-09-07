export class Version {
  private _template: RegExp;
  private _defaultVersion: string;
  private _versionMap: Map<string, number[]>;
  private versions(family: string) {
    return this._versionMap.get(family) || [];
  }
  constructor(
    defaultVersion: string = 'Unknown',
    versionSet: Set<string> = new Set(),
    template: RegExp = /(\w+)\/(\d+)/
  ) {
    this._defaultVersion = defaultVersion;
    if (!template || !versionSet) {
      return;
    }
    this.loadVersionMap(versionSet, template);
  }
  loadVersionMap = (versionSet: Set<string>, template: RegExp = this._template) => {
    const versionMap: Map<string, number[]> = new Map();
    for (let v of Array.from(versionSet)) {
      const [, family, version] = template.exec(v);
      const versionNo = +version;
      if (isNaN(versionNo)) {
        throw new Error(`version ${version} is not a valid number.`);
      }
      if (!versionMap.has(family)) {
        versionMap.set(family, []);
      }
      versionMap.get(family).push(versionNo);
    }
    for (let [k, v] of Array.from(versionMap.entries())) {
      versionMap.set(k, Array.from(new Set(v)).sort((x, y) => x - y));
    }
    this._template = template;
    this._versionMap = versionMap;
  };
  get defaultVersion() {
    return [this._defaultVersion || 'Unknown', 0];
  }
  match(str: string): (string | number)[] {
    const [, family, version] = this._template.exec(str);
    const vInt = +version;
    if (!family || !vInt) {
      return this.defaultVersion;
    }
    const versions = this.versions(family);
    let matched = 0;
    for (let v of versions) {
      if (vInt > v) {
        matched = v;
      }
    }
    if (!matched) {
      return this.defaultVersion;
    }
    return [family, matched];
  }
}