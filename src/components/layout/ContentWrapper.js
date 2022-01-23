/* eslint-disable consistent-return */
import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentSectionState } from '../../store/navigation'

import BackgroundMedia from '../images/BackgroundMedia'
import BackgroundGradient from '../images/BackgroundGradient'
import { SectionBackground } from '../images/SectionBackground'
import { SvgFilters } from '../images/SvgFilters'

export const ContentWrapper = ( { children, layout, image, gradient, sections = [], tag = 'main' } ) => {
   const layoutClass = layout ? `-${ layout }` : '-full'
   const ContentTag = tag

   const currentSection = useRecoilValue( currentSectionState )

   const sectionList = sections.map( (section) => {
      const isCurrent = currentSection === section.slug
      const background = section.sectionbackground

      if ( !background.image ) {
         return
      }

      return <SectionBackground data={ background } active={ isCurrent } key={ section.slug }/>

   })


   return (
      <ContentTag className={ `contentWrapper ${ layoutClass }` }>
         <SvgFilters />

         { gradient &&
            <BackgroundGradient theme={ layout == 'halfWidth' ? 'white' : gradient } />
         }

         { sectionList &&
            sectionList
         }

         { image &&
            <BackgroundMedia image={ image } />
         }

         <div className="contentWrapper__content">
            { children }
         </div>
      </ContentTag>
   )
}