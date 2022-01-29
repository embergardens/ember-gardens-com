import React, { useEffect } from 'react'

// Plugins --------------
import { kebabCase } from 'lodash'
import { useInView } from 'react-intersection-observer'

// Store ---------------
import { useRecoilState } from 'recoil'
import { currentSectionState } from '../../store/navigation'

// Components --------------------
import { ContentDesigner } from '../content/ContentDesigner'
import { Footer } from './Footer'

export const PageSection = ({ data }) => {
   const {
      title,
      isHero,
      isFooter,
      pageTitle,
      navTitle,
      style,
      content,
      eyebrow,
      background: { layout },
   } = data

   const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '-50% 0%',
   })

   const idName = kebabCase( isHero ? pageTitle : navTitle || title )
   const layoutClass = layout ? `-${layout}Layout` : ''

   const [ currentSection, setCurrentSection ] = useRecoilState( currentSectionState )

   useEffect( () => {
      if ( inView ) {
         setCurrentSection( idName )
      }
   }, [inView] )


   return (
      <section ref={ ref } id={ idName } className={`pageSection -${ style } ${ layoutClass }`}>

         <div className="pageSection__wrapper">
            { isHero &&
               <>
                  { eyebrow &&
                     <div className="sectionEyebrow">
                        { eyebrow }
                     </div>
                  }
                  <h1>
                     { title || pageTitle }
                  </h1>
               </>
            }

            { !isHero && !isFooter &&
               <h3 className="sectionTitle">
                  { title }
               </h3>
            }


            { content &&
               <ContentDesigner blocks={ content } hero={ isHero } />
            }

            { isFooter &&
               <Footer links={ data.footerLinks } />
            }
         </div>

      </section>
   )

}