import React, { useEffect } from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// Plugins --------------
import { kebabCase } from 'lodash'
import { useInView } from 'react-intersection-observer'

// Store ---------------
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentSectionObjectState, currentSectionState } from '../../store/navigation'

// Components --------------------
import { ContentDesigner } from '../content/ContentDesigner'
import { Footer } from './Footer'
import { useMediaQuery } from 'react-responsive'
import { isNotDesktop } from '../utility/Breakpoints'
import { TextBlock } from '../blocks/TextBlock'
import { ButtonBlock } from '../blocks/ButtonBlock'
import { currentTextColorOverrideState } from '../../store/global'

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
      locationInfo,
      background: { layout, half, image, imageBg, size, text },
   } = data

   const imageData = getImage(image?.localFile)
   const overlayClass = layout && half !== 'none' ? `-${half}Overlay` : '-noOverlay'

   const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '-70% 0% -30%',
   })

   const mobile = useMediaQuery( useRecoilValue( isNotDesktop ) )

   const idName = kebabCase( isHero ? pageTitle : navTitle || title )
   const layoutClass = layout ? `-${layout}Layout` : ''

   const [ currentSection, setCurrentSection ] = useRecoilState( currentSectionState )
   const [ currentSectionObject, setCurrentSectionObject ] = useRecoilState( currentSectionObjectState )
   const [ currentTextOverride, setCurrentTextOverride ] = useRecoilState( currentTextColorOverrideState )

   useEffect( () => {
      if ( inView ) {
         setCurrentTextOverride( text )
         setCurrentSection( idName )
         setCurrentSectionObject( data )
         document.body.setAttribute('current-section', idName)
      }
   }, [inView] )


   return (
      <section ref={ ref } id={ idName } className={`pageSection -${ style } ${ layoutClass }`}>
         { mobile && style === 'halfWidth' &&
            <div className="pageSection__halfImage">
               <div
                  className={`pageSection__halfImageWrapper ${ overlayClass }` }
                  style={{ backgroundColor: `${ imageBg ? imageBg : imageData.backgroundColor }`}}
               >
                  <GatsbyImage
                     alt={ image.altText }
                     image={ imageData }
                     className='pageSection__halfImageBg'
                     objectFit={ size }
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

            { locationInfo &&
               <LocationHero info={ locationInfo } />
            }

            { isFooter &&
               <Footer links={ data.footerLinks } />
            }
         </div>

      </section>
   )

}

const LocationHero = ({ info }) => {
   const { address, email, phone, intro, links } = info

   return (
      <div className='sectionContent -hero'>
         { intro &&
            <TextBlock content={ intro } />
         }
         { ( address || email || phone ) &&
            <div className='textBlock -details'>
               { address &&
                  <p>
                     <strong>Address:</strong> <a href={ `https://www.google.com/maps/place/${ address.replaceAll(' ', '+') }` } target="_blank">{ address }</a>
                  </p>
               }
               { phone &&
                  <p>
                     <strong>Call us:</strong> <a href={ `tel:${phone}` } target="_blank">{ phone }</a>
                  </p>
               }
               { email &&
                  <p>
                     <strong>Email us:</strong> <a href={ `mailto:${ email }` } target="_blank">{ email }</a>
                  </p>
               }
            </div>
         }
         { links &&
            <ButtonBlock group={ links } />
         }
      </div>
   )
}