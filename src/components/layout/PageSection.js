import React, { useEffect } from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// Plugins --------------
import { kebabCase } from 'lodash'
import { useInView } from 'react-intersection-observer'

// Store ---------------
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentSectionState } from '../../store/navigation'

// Components --------------------
import { ContentDesigner } from '../content/ContentDesigner'
import { Footer } from './Footer'
import { useMediaQuery } from 'react-responsive'
import { isMobile } from '../utility/Breakpoints'

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
      background: { layout, image },
   } = data

   const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '-50% 0%',
   })

   const mobile = useMediaQuery( useRecoilValue( isMobile ) )

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
         { mobile && style === 'halfWidth' &&
            <div className="pageSection__halfImage">
               <div className="pageSection__halfImageWrapper">
                  <GatsbyImage
                     alt={ image.altText }
                     image={ getImage( image?.localFile ) }
                     className='pageSetion__halfImageBg'
                     placeholder="blurred"
                  />
               </div>
            </div>
         }
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