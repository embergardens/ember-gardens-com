import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export const SectionBackground = ({ data, active }) => {

   const { image, brightness, layout, size, imageBg, half } = data

   const imageData = getImage(image?.localFile)

   if (!imageData) return null

   const shouldReduceMotion = useReducedMotion()

   const anime = {
      enter: {
         opacity: 0.9,
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
   const overlayClass = layout && half !== 'none' ? `-${half}Overlay` : '-noOverlay'
   const brightnessClass = ! layout ? `-brightness-${ brightness }` : ''

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
                  className={`backgroundMedia__img ${ brightnessClass }`}
                  objectFit={ size }
               />
            </motion.div>
         }
      </AnimatePresence>
   )
}