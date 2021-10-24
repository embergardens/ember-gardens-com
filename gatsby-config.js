module.exports = {
  siteMetadata: {
    title: 'Ember Gardens',
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
        name: `assets`,
        path: `${__dirname}/content/assets`,
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
