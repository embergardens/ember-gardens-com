require("dotenv").config({
  path: `.env`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Ember Gardens',
    description: `A GatsbyJS website.`,
    author: `@embergardens`,
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    // Gatsby Cloud ====================================
    `gatsby-plugin-gatsby-cloud`,

    // Wordpress =======================================
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || `https://admin-embergardens.flywheelsites.com/graphql`,
        schema: {
          perPage: 50,
          timeout: 60000,
        },
        html: {
          useGatsbyImage: true,
          // gatsbyImageOptions: {},
          // imageMaxWidth: 1024,
          // fallbackImageMaxWidth: 800,
          // imageQuality: 90,
          // createStaticFiles: true,
          generateWebpImages: true,
        },
        auth: {
          htaccess: {
            username: process.env.HTTPBASICAUTH_USERNAME || `flywheel`,
            password: process.env.HTTPBASICAUTH_PASSWORD || `optimal-brain`,
          }
        },
        debug: {
          graphql: {
            showQueryOnError: true,
          },
          preview: true,
        },
      },
    },

    // Source Filesystem =======================================
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },

    // Gatsby Image Plugins =======================================
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // Manifest =======================================
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ember Gardens`,
        short_name: `Ember Gardens`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/img/github-icon.svg`,
      },
    },

    // Helmet =======================================
    `gatsby-plugin-react-helmet`,

    // SASS setup =======================================
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions:  {
          outputStyle: "compressed",
          sourceMap: true,
        }
			},
    },
    // {
    //   resolve:'gatsby-plugin-purgecss',
    //   options: {
    //     develop: true,
    //     printRejected: true,
    //     purgeOnly: ['/css-dev/style.scss'],
    //   },
    // },

  ],
}
