let crypto = require('crypto')
let Vimeo = require('vimeo').Vimeo

const defaultOptions = {}

exports.sourceNodes = async (
  {
    actions: { createNode, createNodeField, touchNode },
    store,
    cache,
    createNodeId
  },
  pluginOptions
) => {
  const options = { ...defaultOptions, ...pluginOptions }
  const { clientId, clientSecret, accessToken } = options

  let client = new Vimeo(clientId, clientSecret, accessToken)
  const videos = await new Promise((resolve, reject) => {
    client.request(
      {
        method: 'GET',
        path: '/me/videos' // /me/videos/{id}
      },
      (error, body, status_code, headers) => {
        if (error) {
          reject(error)
        }
        resolve(body.data)
      }
    )
  })

  videos &&
    videos.map(video => {
      const nodeData = {
        srcset: video.files,
        name: video.name,
        width: video.width,
        height: video.height,
        aspectRatio: video.with / video.height,
        description: video.description,
        pictures: video.pictures,
        user: video.user,
        link: video.link,
        duration: video.duration
      }
      createNode({
        // Data for the node.
        ...nodeData,

        // Required fields.
        id: video.uri.split('/')[2],
        parent: '__SOURCE__', // or null if it's a source node without a parent
        children: [],
        internal: {
          type: `Vimeo`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(nodeData))
            .digest(`hex`)
        }
      })
    })
}

exports.onPreExtractQueries = async ({ store, getNodesByType }) => {
  const program = store.getState().program

  // Check if there are any Vimeo nodes. If so add fragments for Vimeo.
  // The fragment will cause an error if there are no Vimeo nodes.
  if (getNodesByType(`Vimeo`).length == 0) {
    return
  }

  // We have Vimeo nodes so let's add our fragments to .cache/fragments.
  await fs.copy(
    require.resolve(`./src/fragments.js`),
    `${program.directory}/.cache/fragments/vimeo-fragments.js`
  )
}
// onPreExtract nodes can be used to add fragments for ex. srcset
// https://youtu.be/0a5kmU0Dr80?t=462
