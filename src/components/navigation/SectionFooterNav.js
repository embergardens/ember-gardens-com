import React from 'react'

import { useRecoilValue } from 'recoil'
import { IconArrowCircle } from '../icons/IconArrowCircle'
import { currentSectionState } from '../../store/navigation'

export const SectionFooterNav = ({ list }) => {
   const currentSection = useRecoilValue( currentSectionState )

   const currentIndex = list.findIndex( (obj) => currentSection === obj.slug
)
   const next = currentIndex + 1
   let label = 'More About Ember Gardens'
   let slug = 'about-ember-gardens'
   let footer = false

   if ( next > list.length ) {
      label = ''
      slug = list[0].slug
      footer = true
   } else if ( next < list.length ) {
      label = list[next].navigationtitle || list[next].sectiontitle
      slug = list[next].slug
   }

   return (
      <div className="sectionFooter__nav">
         <a href={ `#${ slug }` } className={ `sectionFooter__navLink ${ footer ? '-reverse' : ''}` }>
            { label }
         </a>
         <div className="sectionFooter__navIcon">
            <IconArrowCircle />
         </div>
      </div>
   )
}

// Back to top : scroll to 0 and clear hash from route.