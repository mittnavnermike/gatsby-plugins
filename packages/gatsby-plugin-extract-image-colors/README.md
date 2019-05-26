<div style="text-align: center; padding: 50px 0px;">
  <img src="./logos.png" style="max-width: 100px" />
  <div style="max-width: 500px; margin: 0 auto;">
    <h1 style="border-bottom: none; margin-bottom: 0px;">gatsby-plugin-extract-image-color</h1>
    <p style="font-style: italic">Extracts colors from image adds them to the image data</p>
  </div>
</div>

### Installation

1. `npm i gatsby-plugin-extract-image-color`
2. [Register an app on vimeo](https://developer.vimeo.com/apps/new). You will need a clientId, a clientSecret and an accessToken. Access tokens can be generated on the vimeo app page.
3. Add config to `gatsby-config.js`

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
