import React from 'react'
import { graphql } from "gatsby"
import FeaturedMedia from '../../components/FeaturedMedia'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'

const Page = ({ data }) => {
   const { page } = data
   const { title, content, featuredImage, excerpt, databaseId, uri } = page

   return (
      <Layout>
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
   query page($id: String!) {
      page: wpPage(id: { eq: $id }) {
         ...PageContent
      }
   }
`
export default Page