import React from 'react'
import { graphql } from "gatsby"
import FeaturedMedia from '../../components/images/FeaturedMedia'
import Seo from '../../components/layout/Seo'
import { ContentWrapper } from '../../components/layout/ContentWrapper'

const Page = ({ data }) => {
   const { page } = data
   const { title, content, featuredImage, excerpt, uri } = page

   return (
      <>
         <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />
         <div className="default-template" >
            <ContentWrapper layout="narrow">
               <FeaturedMedia image={featuredImage} />
               <h1>
                  { title }
               </h1>
               <div dangerouslySetInnerHTML={{__html: content}} />
            </ContentWrapper>
         </div>
      </>
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