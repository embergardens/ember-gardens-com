/* eslint-disable arrow-body-style */
import React from 'react'
import { graphql } from "gatsby"

import { kebabCase } from 'lodash'

import { useRecoilValue } from 'recoil'
import { currentSectionState } from '../../store/navigation'
import { footerData } from '../../data/footerSection'

import Seo from '../../components/layout/Seo'
import { ContentWrapper } from '../../components/layout/ContentWrapper'
import { PageSection } from '../../components/layout/PageSection'
import { SectionNav } from '../../components/navigation/SectionNav'
import { SectionFooterNav } from '../../components/navigation/SectionFooterNav'

const Page = ({ data }) => {
   const { page } = data
   const { title, uri, acf, global: { footerImage } } = page
   const { hero, pagesection = [] } = acf
   const { footer } = footerData


   const currentSection = useRecoilValue( currentSectionState )

   // Update Hero / Section Objects
   Object.assign( hero, {
      isHero: true,
      pageTitle: title,
      showinnav: false,
   })

   Object.assign( footer, {
      sectionbackground: {
         image: footerImage  // Footer Image not working yet TODO:
      }
   })


   const sectionArray = [ hero, ...pagesection, footer ]

   const sectionList = sectionArray.map( (section) => {
      const slug = section.isHero ? section.pageTitle : section.navigationtitle ||section.sectiontitle
      Object.assign( section, { slug: kebabCase( slug ) } )
      return section
   })

   // Get Current Section Background
   const currentObject = sectionList.filter( (section) => {
      return currentSection === section.slug
   })

   const currentBackground = currentObject[0] ? currentObject[0].sectionbackground.color : 'gradient'

   // Build Individual Sections
   const sections = sectionList.map( ( section, index ) => {

      return (
         <PageSection
            data={section}
            index={index}
            key={ section.isHero ? section.pageTitle : section.sectiontitle  }
         />
      )
   })

   return (
      <>
         <Seo title={title} uri={uri} />
         <div className="default-template">
            <ContentWrapper layout="open" gradient={ currentBackground } sections={ sectionList }>

               <SectionNav items={ sectionList } />

               { sections }

               <SectionFooterNav list={ sectionList } />

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