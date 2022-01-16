import React from 'react'
import { graphql } from "gatsby"
import Seo from '../../components/layout/Seo'
import { ContentWrapper } from '../../components/layout/ContentWrapper'
import { PageSection } from '../../components/layout/PageSection'
import { SectionNav } from '../../components/navigation/SectionNav'

const Page = ({ data }) => {
   const { page } = data
   const { title, uri, acf } = page
   const { hero, pagesection } = acf

   const sections = pagesection?.map( ( section, index, array ) => <PageSection data={section} index={index} list={array} key={ section.sectiontitle } />)

   return (
      <>
         <Seo title={title} uri={uri} />
         <div className="default-template" >
            <ContentWrapper layout="narrow">
               { pagesection &&
                  <SectionNav items={pagesection} />
               }

               { hero &&
                  <PageSection data={hero} pageTitle={title} list={pagesection} hero />
               }

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