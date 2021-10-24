const postTemplate = require.resolve("../src/templates/posts/index.js")

const GET_POSTS = `
   query GET_POSTS {
      allWpPost {
         edges {
            node {
               title
               uri
               id
               content
            }
         }
      }
   }
`


const allPosts = []

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }, options) => {

/**
* This is the method from Gatsby that we're going
* to use to create posts in our static site.
*/
const { createPage } = actions
/**
* Fetch posts method. This accepts variables to alter
* the query. The variable `first` controls how many items to
* request per fetch and the `after` controls where to start in
* the dataset.
*
* @param variables
* @returns {Promise<*>}
*/
const fetchPosts = async (variables) =>
   /**
    * Fetch posts using the GET_POSTS query and the variables passed in.
    */
   await graphql(GET_POSTS, variables).then(({ data }) => {
   /**
    * Extract the data from the GraphQL query results
    */
   const {
      allWpPost: {
         edges
      },
   } = data

   /**
    * Map over the posts for later creation
    */
   edges
   && edges.map((posts) => {
      allPosts.push(posts)
   })

   return allPosts
   })

   /**
   * Kick off our `fetchPosts` method which will get us all
   * the posts we need to create individual posts.
   */
   await fetchPosts().then((wpPosts) => {

      wpPosts && wpPosts.map((post) => {
      /**
       * Build post path based of theme blogURI setting.
       */
      const path = `news${post.node.uri}`

      createPage({
         path: path,
         component: postTemplate,
         context: {
            id: post.node.id,
            post: post.node,
         },
      })

      reporter.info(`post created:  ${post.node.uri}`)
      })

      reporter.info(`# -----> POSTS TOTAL: ${wpPosts.length}`)
   })
}