"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

let crypto = require("crypto");

let Vimeo = require("vimeo").Vimeo;

const defaultOptions = {};

exports.sourceNodes =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    actions: {
      createNode,
      createNodeField,
      touchNode
    },
    store,
    cache,
    createNodeId
  }, pluginOptions) {
    const options = Object.assign({}, defaultOptions, pluginOptions);
    const clientId = options.clientId,
          clientSecret = options.clientSecret,
          accessToken = options.accessToken;
    let client = new Vimeo(clientId, clientSecret, accessToken);
    const videos = yield new Promise((resolve, reject) => {
      client.request({
        method: "GET",
        path: "/me/videos" // /me/videos/{id}

      }, (error, body, status_code, headers) => {
        if (error) {
          reject(error);
        }

        resolve(body.data);
      });
    });
    videos && videos.map(video => {
      const nodeData = {
        srcset: video.files,
        name: video.name,
        width: video.width,
        height: video.height,
        description: video.description,
        pictures: video.pictures,
        user: video.user,
        link: video.link,
        duration: video.duration
      };
      createNode(Object.assign({}, nodeData, {
        // Required fields.
        id: video.uri.split("/")[2],
        parent: "__SOURCE__",
        // or null if it's a source node without a parent
        children: [],
        internal: {
          type: `Vimeo`,
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify(nodeData)).digest(`hex`)
        }
      }));
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // onPreExtract nodes can be used to add fragments for ex. srcset
// https://youtu.be/0a5kmU0Dr80?t=462