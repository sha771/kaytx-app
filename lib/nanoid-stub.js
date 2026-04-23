// CommonJS/ESM universal stub for nanoid/non-secure
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

const nanoid = function(size) {
  if (size === void 0) { size = 21; }
  let id = '';
  let i = size | 0;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
};

const customAlphabet = function(alphabet, defaultSize) {
  if (defaultSize === void 0) { defaultSize = 21; }
  return function (size) {
    if (size === void 0) { size = defaultSize; }
    let id = '';
    let i = size | 0;
    while (i--) {
      id += alphabet[(Math.random() * alphabet.length) | 0];
    }
    return id;
  };
};

console.log('[KAYTX] nanoid stub initialized');

module.exports = {
  nanoid: nanoid,
  customAlphabet: customAlphabet,
  __esModule: true,
  default: { nanoid, customAlphabet }
};
