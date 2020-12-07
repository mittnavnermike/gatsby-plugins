'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

const fs = require('fs')

const crypto = require('crypto')

const Vimeo = require('vimeo').Vimeo

const defaultOptions = {}

let hasVideoFiles = false

exports.sourceNodes =
  /*#__PURE__*/
  (function() {
    var _ref = (0, _asyncToGenerator2.default)(function*(
      {
        actions: { createNode, createNodeField, touchNode },
        store,
        cache,
        createNodeId
      },
      pluginOptions
    ) {
      const options = Object.assign({}, defaultOptions, pluginOptions)
      const clientId = options.clientId,
        clientSecret = options.clientSecret,
        accessToken = options.accessToken
      const client = new Vimeo(clientId, clientSecret, accessToken)
      const videos = yield new Promise((resolve, reject) => {
        client.request(
          {
            method: 'GET',
            path: '/me/videos?per_page=100' // /me/videos/{id}
          },
          (error, body, status_code, headers) => {
            if (error) reject(error)
            resolve(body.data)
          }
        )
      })
      const videoFiles = videos && videos.filter(video => video.files)
      hasVideoFiles = videoFiles.length !== 0

      if (!hasVideoFiles) {
        console.info(
          'Can\'t access video files through Vimeo API on this account. Won\'t create "VimeoSrcset" fragment.'
        )
        console.info(
          'Please make sure that you\'re on a Pro plan and that "private" and "video_files" are in the scope of your token.'
        )
      }

      videos &&
        videos.map(video => {
          const nodeData = {
            srcset: hasVideoFiles ? video.files : false,
            name: video.name,
            width: video.width,
            height: video.height,
            aspectRatio: video.width / video.height,
            description: video.description,
            pictures: video.pictures,
            user: video.user,
            link: video.link,
            duration: video.duration
          }
          createNode(
            Object.assign({}, nodeData, {
              // Required fields.
              id: video.uri.split('/')[2],
              parent: '__SOURCE__',
              // or null if it's a source node without a parent
              children: [],
              internal: {
                type: `Vimeo`,
                contentDigest: crypto
                  .createHash(`md5`)
                  .update(JSON.stringify(nodeData))
                  .digest(`hex`)
              }
            })
          )
        })
    })

    return function(_x, _x2) {
      return _ref.apply(this, arguments)
    }
  })()

exports.onPreExtractQueries =
  /*#__PURE__*/
  (function() {
    var _ref2 = (0, _asyncToGenerator2.default)(function*({
      store,
      getNodesByType
    }) {
      if (hasVideoFiles) {
        const program = store.getState().program // Check if there are any Vimeo nodes. If so add fragments for Vimeo.
        // The fragment will cause an error if there are no Vimeo nodes.

        if (getNodesByType(`Vimeo`).length == 0) {
          return
        } // We have Vimeo nodes so let's add our fragments to .cache/fragments.

        yield fs.copyFile(
          require.resolve(`${__dirname}/src/fragments.js`),
          `${program.directory}/.cache/fragments/vimeo-fragments.js`,
          err => {
            if (err) throw err
          }
        )
      }
    })

    return function(_x3) {
      return _ref2.apply(this, arguments)
    }
  })() // onPreExtract nodes can be used to add fragments for ex. srcset
// https://youtu.be/0a5kmU0Dr80?t=462
