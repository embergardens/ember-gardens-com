/* eslint-disable no-unreachable */
import React, { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { useRecoilState } from 'recoil'
import { currentTextColorState, currentThemeState } from '../../store/global'

import { Plum, Rose, Coral, White } from '../../globals/colors'
import { updateTextTheme } from '../../functions/theme'
import { hexToRGBA } from '../../functions/colors'

const BackgroundGradient = ( { theme, textOverride, custom } ) => {

   const gradient = ( colors ) => {
      switch (colors) {
         case 'custom':
            return `linear-gradient(90deg, ${ hexToRGBA(custom, 1) }, ${ hexToRGBA(custom, 1) }, ${ hexToRGBA(custom, 1) })`
         break
         case 'gradient':
            return `linear-gradient(90deg, ${ Plum.rgba }, ${ Rose.rgba }, ${ Coral.rgba })`
         break
         case 'plum':
            return `linear-gradient(90deg, ${ Plum.rgba }, ${ Plum.rgba }, ${ Plum.rgba })`
         break
         case 'rose':
            return `linear-gradient(90deg, ${ Rose.rgba }, ${ Rose.rgba }, ${ Rose.rgba })`
         break
         case 'coral':
            return `linear-gradient(90deg, ${ Coral.rgba }, ${ Coral.rgba }, ${ Coral.rgba })`
         break
         case 'white':
            return `linear-gradient(90deg, ${ White.rgba }, ${ White.rgba }, ${ White.rgba })`
         break
         case 'none':
            return 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))'
         break
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
         initial={{ backgroundImage: gradient( custom ? 'custom' : theme ) }}
         animate={{ backgroundImage: gradient( custom ? 'custom' : theme )}}
         transition={{ duration: shouldReduceMotion ? 2 : 1.5 }}
      />
   )
}

export default BackgroundGradient