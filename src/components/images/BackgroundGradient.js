/* eslint-disable no-unreachable */
import React, { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { useRecoilState } from 'recoil'
import { currentTextColorState, currentThemeState } from '../../store/global'

import { Plum, Rose, Coral, White } from '../../globals/colors'
import { updateTextTheme } from '../../functions/theme'

const BackgroundGradient = ( { theme, textOverride } ) => {

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
         case 'none':
            return 'linear-gradient( 90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) )'
         default:
            return White.rgb
         }
   }

   const [ currentTheme, setCurrentTheme ] = useRecoilState( currentThemeState )
   const [ currentTextColor, setCurrentTextColor ] = useRecoilState( currentTextColorState )

   const shouldReduceMotion = useReducedMotion()

   useEffect(() => {
      setCurrentTheme( theme )
      setCurrentTextColor( updateTextTheme( theme, textOverride) )
   }, [theme])

   return (
      <motion.div
         className="backgroundGradient"
         initial={{ backgroundImage: gradient( theme ) }}
         animate={{ backgroundImage: gradient( theme )}}
         transition={{ duration: shouldReduceMotion ? 2 : 1.5 }}
      />
   )
}

export default BackgroundGradient