import React from 'react'
import { graphql } from "gatsby"
import FeaturedMedia from '../../components/FeaturedMedia'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'

const Home = ({ data }) => {
   const { page, template } = data
   const { title, content, featuredImage, excerpt, databaseId, uri } = page

   return (
      <Layout className={ `${template}-template` }>
         <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />

         <FeaturedMedia image={featuredImage} />
         <h1>
            Welcome to EmberGardens
         </h1>
         <div dangerouslySetInnerHTML={{__html: content}} />
      </Layout>
   )
}

export const query = graphql`
   query home($id: String!) {
      page: wpPage(id: { eq: $id }) {
         ...PageContent
      }
   }
`
export default Home