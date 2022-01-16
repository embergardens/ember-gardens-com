import React from 'react'
import { kebabCase } from 'lodash'
import { IconArrowCircle } from '../icons/IconArrowCircle'

export const SectionFooterNav = ({ list, index }) => {
   const next = index + 1
   let label = 'More About Ember Gardens'
   if ( next < list.length ) {
      label = list[next].navigationtitle || list[next].sectiontitle
   }

   return (
      <div className="sectionFooter__nav">
         <a href={ `#${ kebabCase( label ) }` } className="sectionFooter__navLink">
            { label }
         </a>
         <div className="sectionFooter__navIcon">
            <IconArrowCircle />
         </div>
      </div>
   )
}

// Back to top : scroll to 0 and clear hash from route.