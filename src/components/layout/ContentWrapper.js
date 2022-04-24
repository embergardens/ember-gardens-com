/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentSectionState } from '../../store/navigation'

import BackgroundMedia from '../images/BackgroundMedia'
import BackgroundGradient from '../images/BackgroundGradient'
import { SectionBackground } from '../images/SectionBackground'
import { SvgFilters } from '../images/SvgFilters'

export const ContentWrapper = ( { children, frame, header, footer, layout, image, gradient, textOverride, sections = [], tag = 'main' } ) => {
   const layoutClass = layout ? `-${ layout }` : '-full'
   const ContentTag = tag

   const currentSection = useRecoilValue( currentSectionState )
   // Get Current Section Background
   const currentObject = sections.filter( (section) => {
      if ( currentSection === section.slug ) {
         return section
      }
   })

   const currentBackground = currentObject[0] ? currentObject[0].background.color : 'gradient'
   const currentOverride = currentObject[0] ? currentObject[0].background.text : null

   useEffect(() => {
      console.log({currentSection, currentObject, currentBackground })

   }, [currentSection])


   const sectionList = sections.map( (section) => {
      const isCurrent = currentSection === section.slug
      const background = section.background

      if ( !background.image ) {
         return
      }

      return <SectionBackground data={ background } active={ isCurrent } key={ section.slug }/>

   })


   return (
      <ContentTag className={ `contentWrapper ${ layoutClass }` }>
         <SvgFilters />

         { currentBackground &&
            <BackgroundGradient theme={ currentBackground } textOverride={ currentOverride } />
         }

         { sectionList &&
            sectionList
         }

         { image &&
            <BackgroundMedia image={ image } />
         }

         { header &&
            header
         }

         { frame &&
            <div className='contentWrapper__frame'>
               <div className="contentWrapper__content">
                  { children }
               </div>
            </div>
         }

         { !frame &&
            <div className="contentWrapper__content">
               { children }
            </div>
         }

         { footer &&
            footer
         }
      </ContentTag>
   )
}