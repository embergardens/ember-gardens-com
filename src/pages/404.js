import React from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { ContentWrapper } from '../components/layout/ContentWrapper'
import { IconLogoWhite } from '../components/icons/IconLogoWhite'
import Seo from '../components/layout/Seo'

const NotFound = ({location}) => {
   // DATA ====================================================
   const data = useStaticQuery( graphql`
      query NotFoundData {
         options: wp {
            ...Gateway
         }
      }
   `)

   const { options: { acfOptionsGlobal: { globalOptions: { gatewayOptions } } } } = data
   const { backgroundImage: image } = gatewayOptions
   const imageData = getImage(image?.localFile)

   return (
      <>
         <Seo title='404: Not Found' />
         <div className='notFound-template gateway -notFound'>
            <div className='gateway__overlay -notFound'>
               { imageData &&
                  <GatsbyImage
                     alt={image.altText}
                     image={imageData}
                     className='gateway__backgroundImage'
                     placeholder="blurred"
                  />
               }
               <div className='gateway__content'>
                  <div className='gateway__contentWrapper'>
                     <div className='gateway__body'>
                        <h4 className='gateway__title'>
                           Feeling lost?
                        </h4>
                        <div className='gateway__subtitle'>
                           It looks like <br /><strong>{ location.href }</strong><br /> is not a page or can't be found.
                        </div>
                     </div>
                     <div className='gateway__footer'>
                        <IconLogoWhite />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>

   )
}
export default NotFound;