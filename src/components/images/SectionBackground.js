import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { motion, AnimatePresence } from 'framer-motion'

export const SectionBackground = ({ data, active }) => {

   const { image, brightness } = data

   const imageData = getImage(image?.localFile)

   if (!imageData) return null

   const anime = {
      enter: {
         opacity: 1,
         transition: {
            duration: 2.25
         }
      },

      exit: {
         opacity: 0,
         transition: {
            duration: 2.25
         }

      }
   }

   return (
      <AnimatePresence>
         { active &&
            <motion.div
               className="sectionBackground"
               variants={ anime }
               initial='exit'
               animate='enter'
               exit='exit'
            >
               <GatsbyImage
                  alt={image.altText}
                  image={imageData}
                  className={`backgroundMedia__img -brightness-${ brightness }`}
               />
            </motion.div>
         }
      </AnimatePresence>
   )
}