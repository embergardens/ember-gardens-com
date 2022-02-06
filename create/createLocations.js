const _ = require('lodash')

const pageTemplate = require.resolve('../src/templates/locations/index.js')

const GET_LOCATIONS = `
   query GET_LOCATIONS {
      allWpLocation {
         edges {
            node {
               title
               uri
               id
            }
         }
      }
   }
`

const allLocations = []

module.exports = async ({ actions, graphql, reporter }, options) => {
   const { createPage } = actions

   const fetchPages = async (variables) =>
      await graphql(GET_LOCATIONS, variables).then(({data}) => {
         const {
            allWpLocation: {
               edges
            }
         } = data

         edges
         && edges.map((allWpLocation) => {
            allLocations.push(allWpLocation)
         })

         return allLocations
      })

      await fetchPages().then((wpLocations) => {

         wpLocations && wpLocations.map((page) => {
            let pagePath = `${page.node.uri}`

            createPage({
               path: pagePath,
               component: pageTemplate,
               context: {
                  id: page.node.id,
                  page: page.node,
               }
            })

            reporter.info(`page create: ${page.node.uri}`)
         })

         reporter.info(`# --------> LOCATIONS TOTAL: ${wpLocations.length}`)
      })
}