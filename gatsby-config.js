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
        auth: {
          htaccess: {
            username: process.env.HTTPBASICAUTH_USERNAME,
            password: process.env.HTTPBASICAUTH_PASSWORD,
          }
        },
        url: process.env.WPGRAPHQL_URL,
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
        debug: {
          graphql: {
            showQueryOnError: true,
          },
          preview: true,
        },
      },
    },

    // Gravity Forms =====================================
    {
      resolve: "gatsby-plugin-gravity-forms",
      options: {
        url: process.env.WPGRAPHQL_URL,
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

    // Gatsby Transition Link ===================================
    `gatsby-plugin-transition-link`,

    // Manifest =======================================
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ember Gardens`,
        short_name: `Ember Gardens`,
        start_url: `/`,
        background_color: `#402E52`,
        theme_color: `#715191`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`,
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
