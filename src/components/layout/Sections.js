/* eslint-disable arrow-body-style */
import React from 'react'

import { buildPageHero } from '../../functions/heroSection'
import { buildPageFooter } from '../../functions/footerSection'
import { buildSectionObject } from '../../functions/sections'

import Seo from './Seo'
import { ContentWrapper } from './ContentWrapper'
import { PageSection } from './PageSection'
import { SectionNav } from '../navigation/SectionNav'
import { SectionFooterNav } from '../navigation/SectionFooterNav'

const Sections = ({ data, postType }) => {
   const { page, globalFooter } = data
   const { title, uri, acf } = page
   const { hero: pageHero, pagesection = [], footerOptions } = acf

   const hero = buildPageHero( pageHero, title, postType )
   const footer = buildPageFooter( globalFooter, footerOptions )
   const blocks = pagesection ? [ hero, ...pagesection ] : [ hero ]

   const sectionList = blocks.map(section => {
      return buildSectionObject( section )
   })

   if ( ! footerOptions.hideFooter ) {
      sectionList.push( footer )
   }

   // Build Individual Sections
   const sections = sectionList.map( ( section, index ) => {

      return (
         <PageSection
            data={section}
            index={index}
            key={ section.slug  }
         />
      )
   })

   return (
      <>
         <Seo title={title} uri={uri} />
         <div className="default-template">
            <ContentWrapper
               layout="open"
               sections={ sectionList }
               header={ <SectionNav items={ sectionList } /> }
               footer={ <SectionFooterNav list={ sectionList } /> }
               frame
            >

               { sections }

            </ContentWrapper>

         </div>
      </>
   )
}

export default React.memo(Sections)