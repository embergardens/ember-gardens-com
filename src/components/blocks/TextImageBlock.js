/* eslint-disable arrow-body-style */
import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from '../navigation/Link'

export const TextImageBlock = ({ content }) => {
   const { imageLayout, imageShape, image, textgroup, buttongroup } = content
   const { eyebrow, title, subtitle, content: text } = textgroup

   const imageData = getImage(image?.localFile)

   if (!imageData) return null

   const buttons = buttongroup.map( ( btn, index ) => {
      const { style, button } = btn
      return (
         <Link className={`button -${ style }`} to={ button.url } target={ button.target } key={ `${button.title}-${index}` }>
            { button.title }
         </Link>
      )
   })

   const layout = `-${imageLayout}Layout`
   const shape = imageShape ? '-circleFrame' : ''

   return (
      <div className={ `textImageBlock ${layout} ${shape}` }>
         <div className="textImageBlock__wrapper">
            <div className="textImageBlock__content">
               { eyebrow &&
                  <div className='textImageBlock__eyebrow'>
                     { eyebrow }
                  </div>
               }
               { title &&
                  <h4 className='textImageBlock__title'>
                     { title }
                  </h4>
               }
               { subtitle &&
                  <div className='textImageBlock__subtitle'>
                     { subtitle }
                  </div>
               }
               { text &&
                  <div className='textImageBlock__text' dangerouslySetInnerHTML={{__html: text }} />
               }
               { buttongroup &&
                  <div className='textImageBlock__buttons'>
                     { buttons }
                  </div>
               }
            </div>
            <div className='textImageBlock__media'>
               <div className='textImageBlock__mediaWrapper'>
                  <GatsbyImage
                     alt={ image.altText }
                     image={ imageData }
                     className='textImageBlock__image'
                     placeholder="blurred"
                  />
               </div>
            </div>

         </div>
      </div>
   )
}