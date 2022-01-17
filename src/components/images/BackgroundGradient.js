/* eslint-disable no-unreachable */
import React from 'react'
import { motion } from 'framer-motion'

import { Plum, Rose, Coral, White } from '../../globals/colors'

const BackgroundGradient = ( { theme } ) => {

   const gradient = ( colors ) => {
      switch (colors) {
         case 'gradient':
            return `linear-gradient( 90deg, ${ Plum.rgb }, ${ Rose.rgb }, ${ Coral.rgb } )`
         break
         case 'plum':
            return `linear-gradient( 90deg, ${ Plum.rgb }, ${ Plum.rgb }, ${ Plum.rgb } )`
         break
         case 'rose':
            return `linear-gradient( 90deg, ${ Rose.rgb }, ${ Rose.rgb }, ${ Rose.rgb } )`
         break
         case 'coral':
            return `linear-gradient( 90deg, ${ Coral.rgb }, ${ Coral.rgb }, ${ Coral.rgb } )`
         break
         case 'white':
            return `linear-gradient( 90deg, ${ White.rgb }, ${ White.rgb }, ${ White.rgb } )`
         break
         default:
            return White.rgb
         }
   }

   return (
      <motion.div
         className="backgroundGradient"
         initial={{ backgroundImage: gradient( theme ) }}
         animate={{ backgroundImage: gradient( theme )}}
         transition={{ duration: 1.5 }}
      />
   )
}

export default BackgroundGradient