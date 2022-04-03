import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { motion, AnimatePresence } from 'framer-motion'

export const SectionBackground = ({ data, active }) => {

   const { image, brightness, layout, size, imageBg, half } = data

   const imageData = getImage(image?.localFile)

   if (!imageData) return null

   const anime = {
      enter: {
         opacity: 0.9,
         transition: {
            duration: 0.75
         }
      },

      exit: {
         opacity: 0,
         transition: {
            duration: 1.25
         }

      }
   }

   const layoutClass = layout ? `-${layout}Layout` : ''
   const overlayClass = layout && half !== 'none' ? `-${half}Overlay` : '-noOverlay'

   return (
      <AnimatePresence>
         { active &&
            <motion.div
               className={`sectionBackground ${ layoutClass } ${ overlayClass }`}
               variants={ anime }
               initial='exit'
               animate='enter'
               exit='exit'
               style={{ backgroundColor: `${ imageBg ? imageBg : imageData.backgroundColor }`}}
            >
               <GatsbyImage
                  alt={image.altText}
                  image={imageData}
                  className={`backgroundMedia__img -brightness-${ brightness }`}
                  objectFit={ size }
               />
            </motion.div>
         }
      </AnimatePresence>
   )
}