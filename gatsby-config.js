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
    `gatsby-plugin-gatsby-cloud`, // deprecated as of October 1, 2023 -> moved to Netlify
    `gatsby-plugin-netlify`,

    // Wordpress =======================================
    // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/plugin-options.md ======
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
          createStaticFiles: true,
          generateWebpImages: true,
        },
        type: {
          MediaItem: {
            localFile: {
              // excludeByMimeTypes: [`image/jpg`],
              maxFileSizeBytes: 104857600, // 100Mb
            },
          },
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
      resolve: "gatsby-plugin-gravity-forms-v3",
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `videos`,
        path: `${__dirname}/src/assets/video`,
      },
    },

    // Gatsby Image Plugins =======================================
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // Video Plugins =======================================
    `gatsby-plugin-ffmpeg`,
    `gatsby-transformer-ffmpeg`,

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
        icon: `src/assets/favicons/favicon_transparent.svg`,
      },
    },

    // ENV Variables ==========================
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["IS_PREVIEW"]
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

    // Google Analytics ===================================
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-BKHS7G3EV3'
        ],
        pluginConfig: {
          head: true, // places script in <head> instead of bottom of <body>
        }
      }
    }

  ],
}
