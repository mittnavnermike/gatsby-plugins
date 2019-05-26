const fs = require('fs')
const Vibrant = require('node-vibrant')
const Color = require('color')

const getHex = rgb => {
  return Color({
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  }).hex()
}

exports.onCreateNode = async ({ node, actions }) => {
  if (node.extension === 'jpg') {
    // console.log(node)
    // Transform the new node here and create a new node or
    // create a new node field.
    await Vibrant.from(node.absolutePath).getPalette((err, palette) => {
      // console.log(palette)
      const colors = {
        vibrant: getHex(palette.Vibrant._rgb),
        darkVibrant: getHex(palette.DarkVibrant._rgb),
        lightVibrant: getHex(palette.LightVibrant._rgb),
        muted: getHex(palette.Muted._rgb),
        darkMuted: getHex(palette.DarkMuted._rgb),
        lightMuted: getHex(palette.LightMuted._rgb)
      }
      node.colors = colors
    })
  }
}

exports.onPreExtractQueries = async ({ store, getNodesByType }) => {
  const program = store.getState().program

  // Check if there are any Vimeo nodes. If so add fragments for Vimeo.
  // The fragment will cause an error if there are no Vimeo nodes.
  if (getNodesByType(`Vimeo`).length == 0) {
    return
  }

  // We have Vimeo nodes so let's add our fragments to .cache/fragments.
  await fs.copyFile(
    require.resolve(`${__dirname}/src/fragments.js`),
    `${program.directory}/.cache/fragments/extract-image-colors-fragments.js`,
    err => {
      if (err) throw err
    }
  )
}
