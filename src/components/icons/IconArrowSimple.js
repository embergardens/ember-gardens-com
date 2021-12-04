/* eslint-disable arrow-body-style */
import React from 'react'
import { motion } from 'framer-motion'

export const IconArrowSimple = ({ animate = false, isHover }) => {
   const motionSVG = {
      initial: {
         translateX: 3.5,
         transition: {
            type: 'tween',
            duration: 0.25,
            ease: 'easeIn',
         }
      },
      hoverAnimate: {
         translateX: 0,
         transition: {
            type: 'tween',
            duration: 0.25,
            ease: 'easeIn',
         }
      }
   }
   const motionViewbox = {
      initial: {
         translateX: -7,
         transition: {
            type: 'tween',
            duration: 0.25,
            ease: 'easeIn',
         }
      },

      hoverAnimate: {
         translateX: 0,
         transition: {
            type: 'tween',
            duration: 0.25,
            ease: 'easeIn',
         }
      }
   }

   return (
      <motion.svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 31.7 11.28"
         variants={ motionSVG }
         initial='initial'
         animate={ animate && isHover ? 'hoverAnimate' : 'initial'}
         >
         <motion.g
            variants={ motionViewbox }
            initial='initial'
            animate={ animate && isHover ? 'hoverAnimate' : 'initial' }
         >
            <line
               x1="30.65"
               y1="5.64"
               x2="0.65"
               y2="5.64"
               fill="none"
               stroke="currentColor"
               strokeLinecap="round"
               strokeMiterlimit="10"
               strokeWidth="1.3"
            />
            <path d="M31.54,5.25l-.06-.06-5.84-5a.64.64,0,0,0-.9.08.64.64,0,0,0,.06.89L29.28,5h0a.67.67,0,0,1,.15.14,0,0,0,0,0,0,0h0a.52.52,0,0,1,.1.18s0,0,0,0,0,0,0,0a.28.28,0,0,1,0,.13,0,0,0,0,0,0,0v0a.51.51,0,0,1,0,.32.18.18,0,0,1,0,.1h0a.45.45,0,0,1-.12.25h0L26.89,8.55l-2,1.57a.64.64,0,0,0,.76,1l0,0,2-1.6,3.77-3.37A.64.64,0,0,0,31.54,5.25Z" fill="currentColor"/>
         </motion.g>
      </motion.svg>
   )
}