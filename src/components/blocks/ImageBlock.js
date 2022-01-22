import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const ImageBlock = ({ image }) => {
   const imageData = getImage(image?.localFile)

   if (!imageData) return null

   return (
      <div className='imageBlock'>
         <div className='imageBlock__wrapper'>
            <GatsbyImage
               alt={ image.altText }
               image={ imageData }
               className='imageBlock__image'
               placeholder="blurred"
            />
         </div>
         { image.caption &&
            <div
               className='imageBlock__caption'
               dangerouslySetInnerHTML={{__html: image.caption}}
            />
         }
      </div>
   )
}