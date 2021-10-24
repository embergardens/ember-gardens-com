const createWpPages = require('./create/createPages')
const createWpPosts = require('./create/createPosts')

exports.createPages = async ({ graphql, actions, reporter }, options) => {
  await createWpPages({ actions, graphql, reporter }, options)
  await createWpPosts({ actions, graphql, reporter }, options)
}