const pageTemplate = require.resolve('../src/templates/pages/index.js')

const GET_PAGES = `
   query GET_PAGES {
      allWpPage(limit: 10) {
         pageInfo {
            hasNextPage
         }
         edges {
            node {
               title
               uri
               id
               slug
               status
               databaseId
               isFrontPage
               content
            }
         }
      }
   }
`

const allPages = []
let pageNumber = 0
const itemsPerPage = 10

/** Thiss is the export which Gatsby will use to process.
 * @param { actions, graphql }
 * @returns {Promise<void>}
 **/
module.exports = async ({ actions, graphql, reporter }, options) => {
   const { createPage } = actions

   const fetchPages = async (variables) =>
      await graphql(GET_PAGES, variables).then(({data}) => {
         const {
            allWpPage: {
               edges,
               pageInfo: { hasNextPage },
            }
         } = data

         edges
         && edges.map((allWpPage) => {
            allPages.push(allWpPage)
         })

         if (hasNextPage) {
            pageNumber++
            reporter.info(`fetch page ${pageNumber} of pages...`)
            return fetchPages({ first: itemsPerPage })
         }

         return allPages
      })

      await fetchPages({ first: itemsPerPage }).then((wpPages) => {

         wpPages && wpPages.map((page) => {
            let pagePath = `${page.node.uri}`

            if (page.node.isFrontPage) {
               pagePath = '/'
            }

            createPage({
               path: pagePath,
               component: pageTemplate,
               context: {
                  page: page.node,
               }
            })

            reporter.info(`page create: ${page.node.uri}`)
         })

         reporter.info(`# --------> PAGES TOTAL: ${wpPages.length}`)
      })
}