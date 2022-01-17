import React, { useEffect } from 'react'

// Plugins --------------
import { kebabCase } from 'lodash'
import { useInView } from 'react-intersection-observer'

// Store ---------------
import { useRecoilState } from 'recoil'
import { currentSectionState } from '../../store/navigation'

// Components --------------------
import { ContentDesigner } from '../content/ContentDesigner'
import { SectionBackground } from '../images/SectionBackground'

export const PageSection = ({ data }) => {
   const {
      sectiontitle,
      isHero,
      pageTitle,
      navigationtitle: navTitle,
      sectionstyle: style,
      contentdesigner: content,
      sectioneyebrow: eyebrow,
      sectionbackground: background,
   } = data

   const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '-50% 0%',
   })

   const idName = kebabCase( isHero ? pageTitle : navTitle || sectiontitle )

   const [ currentSection, setCurrentSection ] = useRecoilState( currentSectionState )

   useEffect( () => {
      if ( inView ) {
         setCurrentSection( idName )
      }
   }, [inView] )


   return (
      <section ref={ ref } id={ idName } className={`pageSection -${ style }`}>

         <SectionBackground data={ background } />

         <div className="pageSection__wrapper">
            { isHero
               ?
               <>
                  { eyebrow &&
                     <div className="sectionEyebrow">
                        { eyebrow }
                     </div>
                  }
                  <h1>
                     { sectiontitle || pageTitle }
                  </h1>
               </>
               :
               <h3 className="sectionTitle">
                  { sectiontitle }
               </h3>
            }

            { content &&
               <ContentDesigner blocks={ content } hero={ isHero } />
            }
         </div>

      </section>
   )

}