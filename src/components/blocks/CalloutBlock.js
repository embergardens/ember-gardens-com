import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Link from '../navigation/Link'

export const CalloutBlock = ({ data }) => {
   const { background, eyebrow, alignment, title, text, link } = data
   const { brightness, image, color, size } = background

   const imageData = getImage( image.localFile )

   return (
      <div className={`calloutBlock -${alignment} -${size} -${color}`}>
         <div className='calloutBlock__wrapper'>
            <div className='calloutBlock__content'>
               { eyebrow &&
                  <div className='calloutBlock__eyebrow'>
                     { eyebrow }
                  </div>
               }
               { title &&
                  <h4 className='calloutBlock__title'>
                     { title }
                  </h4>
               }
               { text &&
                  <div
                     className='calloutBlock__text'
                     dangerouslySetInnerHTML={{__html: text}}
                  />
               }
               { link &&
                  <Link
                     className='calloutBlock__link'
                     to={ link.url }
                     target={ link.target }
                  >
                     { link.title }
                  </Link>
               }
            </div>
            <div className='calloutBlock__media'>
               { imageData &&
                  <div className={`calloutBlock__img -brightness-${brightness}`}>
                     <GatsbyImage alt={image.altText} image={imageData} className='calloutBlock__bg'/>
                  </div>
               }
            </div>
         </div>
      </div>
   )
}