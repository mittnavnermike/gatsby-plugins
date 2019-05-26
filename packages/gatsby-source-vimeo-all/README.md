# gatsby-source-vimeo-all 📹🎥📽️🎞️

A way to get all of your vimeo videos using the vimeo node-sdk.
Great if you don't want to embed the movies using iframe, but use them in a `<video />` element.

### Installation

1. `npm i gatsby-source-vimeo-all`
2. Register app on vimeo and get tokens and secrets. You will need a clientId, a clientSecret and an accessToken.
3. Add config to `gatsby-config.js`

```js
{
  resolve: "gatsby-source-vimeo-all",
  options: {
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    accessToken: "YOUR_ACCESS_TOKEN",
  },
},

// =>


```

### Query

Example query:

```graphql
{
  vimeo(link: { eq: "https://vimeo.com/315401283/dfd80bf8c1" }) {
    link
    name
    aspectRatio
    srcset {
      quality
      type
      width
      height
      link
      created_time
      fps
      size
      md5
    }
  }
}
```
