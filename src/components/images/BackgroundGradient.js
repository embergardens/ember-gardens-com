/* eslint-disable no-unreachable */
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'



import { Plum, Rose, Coral, White } from '../../globals/colors'
import { useRecoilState } from 'recoil'
import { currentBackgroundGradientState, currentTextÇolorState } from '../../store/global'

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

   const text = ( colors ) => {
      switch (colors) {
         case 'gradient':
            return 'dark'
         break;
         case 'plum':
            return 'dark'
         break;
         case 'rose':
            return 'dark'
         break;
         case 'coral':
            return 'dark'
         break;
         case 'white':
            return 'light'
         break;
         default:
            return 'light'
      }
   }

   const [ currentBackgroundGradient, setCurrentBackgroundGradient ] = useRecoilState( currentBackgroundGradientState )
   const [ currentTextColor, setCurrentTextColor ] = useRecoilState( currentTextÇolorState )

   useEffect(() => {
      setCurrentBackgroundGradient( gradient( theme ) )
      setCurrentTextColor( text( theme ) )
   })

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