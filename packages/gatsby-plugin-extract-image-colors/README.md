<div style="text-align: center; padding: 50px 0px;">
  <img src="./logos.png" style="max-width: 100px" />
  <div style="max-width: 500px; margin: 0 auto;">
    <h1 style="border-bottom: none; margin-bottom: 0px;">gatsby-plugin-extract-image-color</h1>
    <p style="font-style: italic">Extracts colors from image adds them to the image data</p>
  </div>
</div>

### Installation

1. `npm i gatsby-plugin-extract-image-color`
2. Add config to `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  plugins: [
    //... Other plugins
    'gatsby-plugin-extract-image-color'
  ]
}
```

Or with options

```js
module.exports = {
  plugins: [
    //... Other plugins
    {
      resolve: 'gatsby-plugin-extract-image-color',
      options: {
        extensions: ['jpg', 'png']
      }
    }
  ]
}
```

# Example

```jsx
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const query = graphql`
  {
    file(extension: { eq: "jpg" }) {
      relativeDirectory
      name
      id
      publicURL
      extension
      publicURL
      colors {
        ...GatsbyImageColors
      }
      childImageSharp {
        fluid(maxWidth: 2500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const ImageWithBackground = () => {
  const data = useStaticQuery(query)
  return (
    <div style={{ backgroundColor: data.file.colors.vibrant, height: '100vh' }}>
      <Img fluid={data.file.childImageSharp.fluid} />
    </div>
  )
}

export default ImageWithBackground
```