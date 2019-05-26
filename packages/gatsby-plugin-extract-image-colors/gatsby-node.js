"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const fs = require('fs');

const Vibrant = require('node-vibrant');

const Color = require('color');

const defaultOptions = {
  extensions: ['jpg', 'png'],
  exclude: []
};

const getHex = rgb => {
  return Color({
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  }).hex();
};

exports.onCreateNode =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    node,
    actions
  }, pluginOptions) {
    const options = Object.assign({}, Object.assign({}, defaultOptions, pluginOptions));

    if (options && options.extensions && options.exclude && options.extensions.indexOf(node.extension) !== -1 && options.exclude.indexOf(`${node.name}${node.ext}`) === -1) {
      // Transform the new node here and create a new node or
      // create a new node field.
      yield Vibrant.from(node.absolutePath).getPalette((err, palette) => {
        const colors = {
          vibrant: getHex(palette.Vibrant._rgb),
          darkVibrant: getHex(palette.DarkVibrant._rgb),
          lightVibrant: getHex(palette.LightVibrant._rgb),
          muted: getHex(palette.Muted._rgb),
          darkMuted: getHex(palette.DarkMuted._rgb),
          lightMuted: getHex(palette.LightMuted._rgb)
        };
        node.colors = colors;
      });
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.onPreExtractQueries =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* ({
    store,
    getNodesByType
  }) {
    const program = store.getState().program; // Check if there are any File nodes. If so add fragments for File.
    // The fragment will cause an error if there are no File nodes.

    if (getNodesByType(`File`).length == 0) {
      return;
    } // We have File nodes so let's add our fragments to .cache/fragments.


    yield fs.copyFile(require.resolve(`${__dirname}/src/fragments.js`), `${program.directory}/.cache/fragments/extract-image-colors-fragments.js`, err => {
      if (err) throw err;
    });
  });

  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();