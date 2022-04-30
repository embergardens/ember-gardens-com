import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { kebabCase } from 'lodash'

import { useRecoilState } from 'recoil'
import { currentSectionObjectState, currentSectionState } from '../../store/navigation'

import Seo from '../../components/layout/Seo'
import { ContentWrapper } from '../../components/layout/ContentWrapper'
import { ListingRow } from '../../components/content/ListingRow'

const ListingTemplate = ({ data }) => {

   const { page: { title, uri, template: { listingPageTemplate } } } = data
   const { background, listingRow } = listingPageTemplate

   const idName = kebabCase( title )
   const section = {
      background,
      slug: idName,
   }

   const [ currentSection, setCurrentSection ] = useRecoilState( currentSectionState )
   const [ currentSectionObject, setCurrentSectionObject ] = useRecoilState( currentSectionObjectState )

   useEffect( () => {
      setCurrentSection( idName )
      setCurrentSectionObject( listingPageTemplate )
      document.body.setAttribute('current-section', idName)
   }, [])

   return (
      <>
         <Seo title={title} uri={uri} />
         <div className="listing-template">
            <ContentWrapper layout="open" sections={ [section] }>
               <h1 className='sr-only'>{ title }</h1>
               <section className='pageSection -fullWidth' id={ idName }>
                  <div className='pageSection__wrapper'>
                     <ListingRow rows={ listingRow } />
                  </div>
               </section>
            </ContentWrapper>
         </div>
      </>
   )
}

export const query = graphql`
   query listingPage($id: String!) {
      page: wpPage(id: { eq: $id }) {
         ...ListingPageContent
      }
   }
`

export default ListingTemplate