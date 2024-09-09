// Patch BigNumber
// https://github.com/GoogleChromeLabs/jsbi/issues/30
// eslint-disable-next-line no-extend-native
Object.defineProperty(BigInt.prototype, "toJSON", {
  value: function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.toString();
  },
  configurable: true,
  enumerable: false,
  writable: true,
});

export {};
