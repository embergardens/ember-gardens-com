// React / Gatsby --------------------------------------------------
import React from 'react'
import { useRecoilState} from 'recoil'

// Plugins ---------------------------------------------------------
import { motion } from 'framer-motion'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'

// Animation Variables ---------------------------------------------

const motionSVG = {
   menuClosed: {

   },

   menuOpen: {

   },

   menuClosedHover: {

   },

   menuOpenHover: {

   }
}
const motionCloseC = {
   menuClosed: {
      opacity: 0,
      translateX: -50
   },

   menuOpen: {
      opacity: 1,
   },

   menuClosedHover: {

   },

   menuOpenHover: {
      // opacity: 1,
      // translateX: -10
   }
}
const motionCloseL = {
   menuClosed: {
      opacity: 0,
      translateX: -50
   },

   menuOpen: {
      opacity: 1,
   },

   menuClosedHover: {

   },

   menuOpenHover: {
      // opacity: 1,
      // translateX: -5
   }
}
const motionCloseO = {
   menuClosed: {
      opacity: 0,
      translateX: 0
   },

   menuOpen: {
      opacity: 1,
   },

   menuClosedHover: {

   },

   menuOpenHover: {
      // opacity: 1,
      // translateX: 0
   }
}
const motionCloseS = {
   menuClosed: {
      opacity: 0,
      translateX: 50
   },

   menuOpen: {
      opacity: 1,
   },

   menuClosedHover: {

   },

   menuOpenHover: {
      // opacity: 1,
      // translateX: 5
   }
}
const motionCloseE = {
   menuClosed: {
      opacity: 0,
      translateX: 50
   },

   menuOpen: {
      opacity: 1,
   },

   menuClosedHover: {

   },

   menuOpenHover: {
      // opacity: 1,
      // translateX: 10
   }
}
const motionMenuM = {
   menuClosed: {
      opacity: 1,
   },

   menuOpen: {
      opacity: 0,
      translateX: -50
   },

   menuClosedHover: {
      // opacity: 1,
      // translateX: -5
   },

   menuOpenHover: {

   }
}
const motionMenuE = {
   menuClosed: {
      opacity: 1,
   },

   menuOpen: {
      opacity: 0,
      translateX: -50
   },

   menuClosedHover: {
      // opacity: 1,
      // translateX: -2.5
   },

   menuOpenHover: {

   }
}
const motionMenuN = {
   menuClosed: {
      opacity: 1,
   },

   menuOpen: {
      opacity: 0,
      translateX: 50
   },

   menuClosedHover: {
      // opacity: 1,
      // translateX: 2.5
   },

   menuOpenHover: {

   }
}
const motionMenuU = {
   menuClosed: {
      opacity: 1,
   },

   menuOpen: {
      opacity: 0,
      translateX: 50
   },

   menuClosedHover: {
      // opacity: 1,
      // translateX: 5
   },

   menuOpenHover: {

   }
}
const motionStickLeft = {
   menuClosed: {
      opacity: 0,
      points: "27.25 7.58 27.24 7.58 26.64 8.69 16.63 27.16 12.55 27.16 27.2 0.16 29.23 3.92 27.25 7.58"
   },

   menuOpen: {
      opacity: 1,
      points: "32.81 10.48 32.81 10.48 31.99 11.43 18.17 27.16 12.55 27.16 32.75 4.16 35.55 7.36 32.81 10.48"
   },

   menuClosedHover: {

   },

   menuOpenHover: {
      opacity: 1,
      points: "35.46 10.56 35.45 10.56 34.52 11.5 18.91 27.16 12.55 27.16 35.38 4.27 38.55 7.45 35.46 10.56"
   }
}

const motionStickRight = {
   menuClosed: {
      opacity: 0,
      points: "27.19 7.58 27.19 7.58 27.79 8.69 37.8 27.16 41.88 27.16 27.24 0.16 25.2 3.92 27.19 7.58"
   },

   menuOpen: {
      opacity: 1,
      points: "21.34 10.48 21.34 10.48 22.17 11.43 36.18 27.16 41.88 27.16 21.4 4.16 18.55 7.36 21.34 10.48"
   },

   menuClosedHover: {

   },

   menuOpenHover: {
      opacity: 1,
      points: "18.69 10.56 18.7 10.56 19.64 11.5 35.45 27.16 41.88 27.16 18.77 4.27 15.55 7.45 18.69 10.56"
   }
}
const motionMtnCenter = {
   menuClosed: {
      opacity: 1,
   },

   menuOpen: {
      opacity: 0,
   },

   menuClosedHover: {

   },

   menuOpenHover: {

   }
}
const motionMtnLeft = {
   menuClosed: {
      opacity: 1,
   },

   menuOpen: {
      opacity: 0,
      translateX: -50
   },

   menuClosedHover: {
      opacity: 1,
      translateX: -5
   },

   menuOpenHover: {

   }
}
const motionMtnRight = {
   menuClosed: {
      opacity: 1,
   },

   menuOpen: {
      opacity: 0,
      translateX: 50
   },

   menuClosedHover: {
      opacity: 1,
      translateX: 5,
   },

   menuOpenHover: {

   }
}

// NavTrigger Component ---------------------------------------------


export const NavTrigger = () => {
   const [ navOpen, setNavOpen ] = useRecoilState( navOpenState )
   const onToggleNavOpen = () => setNavOpen( (currentState) => (!currentState) )

   return (
      <motion.button
         className="navBar__trigger"
         type="button"
         onClick={ onToggleNavOpen }
         variants={ motionSVG }
         initial='closed'
         animate={ navOpen ? 'menuOpen' : 'menuClosed' }
         whileHover={ navOpen ? 'menuOpenHover' : 'menuClosedHover' }
      >
         <IconMenuTrigger />
      </motion.button>
   )
}

export const IconMenuTrigger = ( props ) => {
   const textColor = 'currentColor'
   const iconColor = '#715191'

   return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.2 48.4" className="iconMenuTrigger">
         <title>Menu</title>
         <g id="close_group">
            <motion.path variants={ motionCloseC} id="close_c" d="M12.61,39A3.21,3.21,0,0,1,14,40.36a4.28,4.28,0,0,1,.52,2.17H11.85v-.47a1.27,1.27,0,0,0-.38-1,1.34,1.34,0,0,0-1-.37h-.07a1.35,1.35,0,0,0-1.36,1.36v2.61A1.35,1.35,0,0,0,10.43,46h.19a1.37,1.37,0,0,0,1-.36,1.29,1.29,0,0,0,.39-1v-.44h2.55a4.28,4.28,0,0,1-.5,2.09,3.45,3.45,0,0,1-1.36,1.37,4.13,4.13,0,0,1-2,.47h-.38a4.82,4.82,0,0,1-2.19-.49,3.7,3.7,0,0,1-1.55-1.41A4,4,0,0,1,6,44.09V42.65a4,4,0,0,1,.57-2.11A4.1,4.1,0,0,1,8.12,39.1a4.42,4.42,0,0,1,2.09-.51h.38A4.44,4.44,0,0,1,12.61,39Z" fill={ textColor }/>
            <motion.path variants={ motionCloseL} id="close_l" d="M18.5,45.75h3.38L22.15,48H15.63V38.72H18.5Z" fill={ textColor }/>
            <motion.path variants={ motionCloseO} id="close_o" d="M29.52,39.16A4.2,4.2,0,0,1,31,40.64a4,4,0,0,1,.55,2v1.41a4,4,0,0,1-.55,2,4.12,4.12,0,0,1-1.48,1.48,3.9,3.9,0,0,1-2,.55h-.76a3.9,3.9,0,0,1-2-.55,4.12,4.12,0,0,1-1.48-1.48,3.9,3.9,0,0,1-.55-2V42.68a3.9,3.9,0,0,1,.55-2,4.2,4.2,0,0,1,1.48-1.48,4,4,0,0,1,2-.55h.76A4,4,0,0,1,29.52,39.16Zm-3.41,1.93a1.34,1.34,0,0,0-.39,1v2.61a1.33,1.33,0,0,0,.39,1,1.3,1.3,0,0,0,1,.39h.07a1.3,1.3,0,0,0,1-.39,1.34,1.34,0,0,0,.4-1V42.06a1.35,1.35,0,0,0-.4-1,1.3,1.3,0,0,0-1-.39h-.07A1.3,1.3,0,0,0,26.11,41.09Z" fill={ textColor }/>
            <motion.path variants={ motionCloseS} id="close_s" d="M39.18,39.3a2.4,2.4,0,0,1,1.06,2.13v.17h-2.6v-.06a.85.85,0,0,0-.28-.64,1.23,1.23,0,0,0-.85-.25,1.85,1.85,0,0,0-.84.15.47.47,0,0,0-.28.42.55.55,0,0,0,.33.49,3.64,3.64,0,0,0,1,.32l1.21.27c1.68.38,2.52,1.25,2.52,2.62a2.81,2.81,0,0,1-1.1,2.45,5.11,5.11,0,0,1-3,.79,5.94,5.94,0,0,1-2-.32,3.23,3.23,0,0,1-1.45-1,2.52,2.52,0,0,1-.55-1.66V45a.71.71,0,0,1,0-.16H35a.62.62,0,0,0,0,.16.93.93,0,0,0,.29.7,1.41,1.41,0,0,0,1,.27,2.17,2.17,0,0,0,1-.16.48.48,0,0,0,.27-.43.54.54,0,0,0-.38-.49,6.8,6.8,0,0,0-1.2-.35,10.67,10.67,0,0,1-1.71-.48A2.79,2.79,0,0,1,33,43.2a2.87,2.87,0,0,1,0-3.27,3.26,3.26,0,0,1,1.42-1,5.8,5.8,0,0,1,2-.33A4.84,4.84,0,0,1,39.18,39.3Z" fill={ textColor }/>
            <motion.path variants={ motionCloseE} id="close_e" d="M48.28,40.86H44.36v1.36h3.77V44.3H44.36v1.5h3.92L48.55,48h-7V38.72h7Z" fill={ textColor }/>
         </g>
         <g id="sticks_group">
               <motion.polygon
                  variants={ motionStickRight }
                  points="27.19 7.58 27.19 7.58 27.79 8.69 37.8 27.16 41.88 27.16 27.24 0.16 25.2 3.92 27.19 7.58"
                  fill={ iconColor }
               />
               <motion.polygon
                  variants={ motionStickLeft }
                  points="27.25 7.58 27.24 7.58 26.64 8.69 16.63 27.16 12.55 27.16 27.2 0.16 29.23 3.92 27.25 7.58"
                  fill={ iconColor }
               />

         </g>
         <g id="menu_group">
            <motion.path variants={ motionMenuM} id="menu_m" d="M19.85,48.26H16.91V42.1h-.05l-1.68,6.16H11.8L10.14,42.1h-.07v6.16H7.39v-9.6h4.82l1.38,5.12h.06L15,38.66h4.84Z" fill={ textColor } />
            <motion.path variants={ motionMenuE} id="menu_e" d="M28.38,40.87H24.33v1.4h3.89v2.14H24.33V46h4.05l.28,2.3H21.45v-9.6h7.21Z" fill={ textColor } />
            <motion.path variants={ motionMenuN} id="menu_n" d="M38,48.26H35.47L32.59,44.1l0-.1v4.26h-2.7v-9.6h2.46l2.94,4.25,0,.1V38.66H38Z" fill={ textColor } />
            <motion.path variants={ motionMenuU} id="menu_u" d="M47.21,46.89A3,3,0,0,1,45.89,48a4.74,4.74,0,0,1-2,.39h-.6a4.74,4.74,0,0,1-2-.39A3,3,0,0,1,40,46.89a3,3,0,0,1-.47-1.68V38.66h2.95v6.51a1,1,0,0,0,.33.75,1.16,1.16,0,0,0,.81.3,1.14,1.14,0,0,0,.8-.3,1,1,0,0,0,.33-.75V38.66h2.94v6.55A3,3,0,0,1,47.21,46.89Z" fill={ textColor } />
         </g>
         <g id="mountain_group">
            <motion.path variants={ motionMtnCenter} id="mountain_center" d="M39.93,23.9H17.83l3.35-6.17H36.73L27.11,0,12.38,27.17H41.81ZM27.16,6.69l4.14,7.63H23Z" fill={ iconColor } />
            <motion.path variants={ motionMtnLeft} id="moutain_left" d="M5.25,23.89l7.09-13.18,2.94,5.41L17,13.05,12.3,4.48,0,27.16H9.29l1.77-3.27H5.25" fill={ iconColor } />
            <motion.path variants={ motionMtnRight} id="moutain_right" d="M48.94,23.89,41.86,10.71l-2.94,5.41-1.67-3.07L41.9,4.48,54.2,27.16H44.91l-1.78-3.27h5.81" fill={ iconColor } />
         </g>
      </svg>
   )
}