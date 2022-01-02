/* eslint-disable arrow-body-style */
// React / Gatsby --------------------------------------------------
import React from 'react'
import { useRecoilState} from 'recoil'

// Plugins ---------------------------------------------------------
import { motion, AnimatePresence } from 'framer-motion'

// Store -----------------------------------------------------------
import { activeTransitionState, navOpenState } from '../../store/navigation'

export const TransitionScreen = () => {

   const [ activeTransition, setActiveTransition ] = useRecoilState( activeTransitionState )
   const [ navOpen, setNavOpen ] = useRecoilState( navOpenState )
   const onDeactivate = () => setActiveTransition( false )
   const onToggleNavOpen = () => setNavOpen( false )

   const screen = {
      active: {
         opacity: 1,
         zIndex: 9999,
         transition: {
            duration: 0.5
         }
      },

      inactive: {
         opacity: 0,
         zIndex: 9999,
         transition: {
            delay: 0.5,
            duration: 0.5
         }
      }
   }

   const onStart = () => {
      if ( navOpen ) {
         onToggleNavOpen()
      }
   }

   const onComplete = ( definition ) => {
      if ( definition === 'active' ) {
         onDeactivate()
      }
   }

   return (
      <AnimatePresence exitBeforeEnter>
         { activeTransition &&
            <motion.div
            className="backgroundGradient"
            variants={ screen }
            initial='inactive'
            animate='active'
            exit='inactive'
            onAnimationComplete={ onComplete }
            onAnimationStart={ onStart }

            />
         }
      </AnimatePresence>
   )
}