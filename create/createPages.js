const pageTemplate = require.resolve('../src/templates/pages/index.js')
const homepageTemplate = require.resolve('../src/templates/home/index.js')

const GET_PAGES = `
   query GET_PAGES {
      allWpPage {
         edges {
            node {
               title
               uri
               id
               isFrontPage
               template
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
               component: page.node.isFrontPage ? homepageTemplate : pageTemplate,
               context: {
                  id: page.node.id,
                  page: page.node,
               }
            })

            reporter.info(`page create: ${page.node.uri}`)
         })

         reporter.info(`# --------> PAGES TOTAL: ${wpPages.length}`)
      })
}