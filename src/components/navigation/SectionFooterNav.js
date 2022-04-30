import React from 'react'

import { useRecoilValue } from 'recoil'
import { IconArrowLongDown } from '../icons/IconArrowLongDown'
import { currentSectionState } from '../../store/navigation'

export const SectionFooterNav = ({ list }) => {
   const currentSection = useRecoilValue( currentSectionState )

   const currentIndex = list.findIndex( (obj) => currentSection === obj.slug
)
   const next = currentIndex + 1
   let label = ''
   let slug = ''
   let footer = false
   let aria = ''

   if ( next === list.length ) {
      label = 'TOP'
      slug = list[0].slug
      footer = true
      aria = 'Scroll back to top of page.'
   } else if ( list[next].isFooter ) {
      label = 'MORE'
      slug = list[next].slug
      aria = 'Scroll to footer'
   } else if ( next < list.length ) {
      label = list[next].navTitle || list[next].title
      slug = list[next].slug
      aria = `Scroll to next section: ${ label }`
   }

   return (
      <div className="sectionFooter__nav">
         { list.length > 1 &&
            <>
               <a href={ `#${ slug }` } className='sectionFooter__navLink' aria-label={ aria } >
                  { label }
               </a>
               <div className={ `sectionFooter__navIcon ${ footer ? '-reverse' : ''}` }>
                  <IconArrowLongDown />
               </div>
            </>
         }
      </div>
   )
}

// Back to top : scroll to 0 and clear hash from route.