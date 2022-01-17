import React from 'react'
import BackgroundMedia from '../images/BackgroundMedia'
import BackgroundGradient from '../images/BackgroundGradient'
import { SvgFilters } from '../images/SvgFilters'

export const ContentWrapper = ( { children, layout, image, gradient } ) => {
   const layoutClass = layout ? `-${ layout }` : '-full'

   return (
      <main className={ `contentWrapper ${ layoutClass }` }>
         <SvgFilters />

         { image &&
            <BackgroundMedia image={ image } />
         }

         { gradient &&
            <BackgroundGradient theme={ gradient } />
         }

         <div className="contentWrapper__content">
            { children }
         </div>
      </main>
   )
}