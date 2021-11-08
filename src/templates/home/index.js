import React from 'react'
import { graphql } from "gatsby"
import FeaturedMedia from '../../components/images/FeaturedMedia'
import Seo from '../../components/layout/Seo'

const Home = ({ data }) => {
   const { page, template } = data
   const { title, content, featuredImage, excerpt, databaseId, uri } = page

   return (
      <>
         <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />
         <div className={ `${template}-template` } ></div>
         <FeaturedMedia image={featuredImage} />
         <h1>
            Welcome to EmberGardens
         </h1>
         <div dangerouslySetInnerHTML={{__html: content}} />
      </>
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