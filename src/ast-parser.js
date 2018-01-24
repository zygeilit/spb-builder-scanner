
export default {
  *forEachProperty (node) {
    for (let prop in node) {
      if (this._ignoredProperties.has(prop)) {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
        computed: false,
      }
    }
  }
}