const _ = require('lodash')

const pageTemplate = require.resolve('../src/templates/pages/index.js' )
const homepageTemplate = require.resolve('../src/templates/home/index.js' )
const simpleTemplate = require.resolve( '../src/templates/pages/simple.js' )
const listingTemplate = require.resolve( '../src/templates/pages/listing.js' )
const sectionsTemplate = require.resolve( '../src/templates/pages/sections.js' )

const getTemplate = ( node ) => {
   if ( node.isFrontPage ) {
      return homepageTemplate
   }

   if ( node.template.templateName === 'Default' ) {
      return pageTemplate
   }

   if ( node.template.templateName === 'Listing Template' ) {
      return listingTemplate
   }

   if ( node.template.templateName === 'Sections Template' ) {
      return sectionsTemplate
   }

   return simpleTemplate

}

const GET_PAGES = `
   query GET_PAGES {
      allWpPage {
         edges {
            node {
               title
               uri
               id
               isFrontPage
               template {
                  templateName
               }

            }
         }
      }
   }
`

const allPages = []

module.exports = async ({ actions, graphql, reporter }, options) => {
   const { createPage } = actions

   const fetchPages = async (variables) =>
      await graphql(GET_PAGES, variables).then(({data}) => {
         const {
            allWpPage: {
               edges
            }
         } = data

         edges
         && edges.map((allWpPage) => {
            allPages.push(allWpPage)
         })

         return allPages
      })

      await fetchPages().then((wpPages) => {

         wpPages && wpPages.map((page) => {
            let pagePath = `${page.node.uri}`

            if (page.node.isFrontPage) {
               pagePath = '/'
            }

            createPage({
               path: pagePath,
               component: getTemplate( page.node ),
               context: {
                  id: page.node.id,
                  page: page.node,
                  template: _.camelCase( page.node.template.templateName ),
               }
            })

            reporter.info(`page create: ${page.node.uri} ${ page.node.template.templateName }`)
         })

         reporter.info(`# --------> PAGES TOTAL: ${wpPages.length}`)
      })
}