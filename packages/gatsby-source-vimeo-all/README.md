<div style="text-align: center; padding: 50px 0px;">
  <img src="./logos.png" style="max-width: 100px" />
  <div style="max-width: 500px; margin: 0 auto;">
    <h1 style="border-bottom: none; margin-bottom: 0px;">gatsby-source-vimeo-all</h1>
    <p style="font-style: italic">A way to get all of your vimeo videos using the vimeo node-sdk.
  Great if you don't want to embed the movies using iframe, but use them in a <span style="white-space: nowrap">&lt;video /&gt; <span />element.</p>
  </div>
</div>

### Installation

1. `npm i gatsby-source-vimeo-all`
2. [Register an app on vimeo](https://developer.vimeo.com/apps/new). You will need a clientId, a clientSecret and an accessToken. Access tokens can be generated on the vimeo app page.
3. Add config to `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  plugins: [
    //... Other plugins
    {
      resolve: 'gatsby-source-vimeo-all',
      options: {
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        accessToken: 'YOUR_ACCESS_TOKEN'
      }
    }
  ]
}
```

### Example usage

Bare bones example to get you started.

```jsx
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  {
    vimeo(link: { eq: "https://vimeo.com/315401283/dfd80bf8c1" }) {
      name
      description
      duration
      link
      aspectRatio
      width
      height
      srcset {
        ...GatsbyVimeoSrcSet
      }
      pictures {
        uri
      }
      user {
        name
      }
    }
  }
`

const Video = () => {
  const { vimeo } = useStaticQuery(query)
  return <video src={vimeo.srcset[0].link} controls autoPlay loop />
}

export default Video
```

### Fragments

**GatsbyVimeoSrcSet**  
Gives you all of the srcset properties. This is probably the one you're going to use the most.
