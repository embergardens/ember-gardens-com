const globImporter = require('node-sass-glob-importer')

module.exports = {
  siteMetadata: {
    title: 'Gatsby + WordPress Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        importer: globImporter(),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/img/github-icon.svg`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      // Removes unused css rules
      resolve:'gatsby-plugin-purgecss',
      options: {
        // Activates purging in gatsby develop
        develop: true,
        // Purge only the main css file
        purgeOnly: ['/css-dev/style.scss'],
      },
    }, // must be after other CSS plugins
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `http://legion.timothyspears.com/graphql`,
        schema: {
          perPage: 50,
          timeout: 60000,
        },
        debug: {
          graphql: {
            showQueryOnError: true,
          },
        },
      }
    }
  ],
}
