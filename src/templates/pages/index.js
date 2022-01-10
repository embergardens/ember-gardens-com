import React from 'react'
import { graphql } from "gatsby"
import Seo from '../../components/layout/Seo'
import { ContentWrapper } from '../../components/layout/ContentWrapper'
import { PageSection } from '../../components/layout/PageSection'

const Page = ({ data }) => {
   const { page } = data
   const { title, uri, acf } = page
   const { hero, pagesection } = acf

   const sections = pagesection.map( ( section, index ) => <PageSection data={section} key={ index } />)

   return (
      <>
         <Seo title={title} uri={uri} />
         <div className="default-template" >
            <ContentWrapper layout="narrow">

               <PageSection data={hero} hero />

               { pagesection &&
                  sections
               }

            </ContentWrapper>
         </div>
      </>
   )
}

export const query = graphql`
   query page($id: String!) {
      page: wpPage(id: { eq: $id }) {
         ...DefaultPageContent
      }
   }
`
export default Page