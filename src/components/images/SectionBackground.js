import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export const SectionBackground = ({ data, active }) => {

   const { image, brightness, layout, size, imageBg, half, version } = data

   const imageData = getImage(image?.localFile)

   if (!imageData) return null

   const shouldReduceMotion = useReducedMotion()

   const anime = {
      enter: {
         opacity: version ? 1 : 0.9,
         transition: {
            duration: shouldReduceMotion ? 2 :  0.75
         }
      },

      exit: {
         opacity: 0,
         transition: {
            duration: shouldReduceMotion ? 2 :  1.25
         }

      }
   }

   const layoutClass = layout ? `-${layout}Layout` : ''
   const overlayClass = layout && half && half !== 'none' ? `-${half}Overlay` : '-noOverlay'
   const brightnessClass = ! layout ? `-brightness-${ brightness }` : ''
   const bgColor = imageBg ? imageBg : imageData.backgroundColor

   return (
      <AnimatePresence>
         { active &&
            <motion.div
               className={`sectionBackground ${ layoutClass } ${ overlayClass } ${ version ? '-graphicVersion' : '' }`}
               variants={ anime }
               initial='exit'
               animate='enter'
               exit='exit'
               style={{ backgroundColor: `${ bgColor }`, '--imageBackground': bgColor }}
            >
               <GatsbyImage
                  alt={image.altText}
                  image={imageData}
                  className={`backgroundMedia__img ${ brightnessClass }`}
                  objectFit={ size }
               />
            </motion.div>
         }
      </AnimatePresence>
   )
}