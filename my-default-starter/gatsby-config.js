const VIMEO_CLIENT_ID = "e327a7eba9200f498a945051bc34a725ec4c167a"
const VIMEO_CLIENT_SECRET =
  "RO1eymhpQ/Pk0nRfKI1tiodCDVuxjRsmwotCbDczOL98iNjhbZR/2uDjkCsIbIsqHShF8uiACo+rnA8CQcNlAwASzxy1rMoXMnjEbCYRctpNmnrL50qiXvU7119UkzDt"
const VIMEO_ACCESS_TOKEN = "97bf389f2b3a5d7157f199d280e5ba4f"

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-vimeo-all",
      options: {
        clientId: VIMEO_CLIENT_ID,
        clientSecret: VIMEO_CLIENT_SECRET,
        accessToken: VIMEO_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
