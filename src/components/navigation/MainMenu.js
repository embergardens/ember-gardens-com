// React / Gatsby --------------------------------------------------
import React, { useEffect, useRef, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { useMediaQuery } from 'react-responsive'

// Plugins ---------------------------------------------------------
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Components ------------------------------------------------------
import Link from './Link'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'
import { isDesktop } from '../utility/Breakpoints'

// Icons -----------------------------------------------------------
import { IconArrowDouble } from '../icons/IconArrowDouble'
import { IconEmail } from '../icons/IconEmail'
// import { IconExternalLink } from '../icons/IconExternalLink'
import { IconInstagram } from '../icons/IconInstagram'
import { FormBlock } from '../blocks/FormBlock'
import { focusableElements, waitForEl } from '../../functions/utility'

export const MainMenu = () => {
   const desktop = useMediaQuery( useRecoilValue( isDesktop ) )
   const shouldReduceMotion = useReducedMotion()

   const data = useStaticQuery(graphql`
      query MainMenuData {
         mainMenu: wpMenu(locations: {eq: PRIMARY}) {
            menuItems {
               nodes {
                  url
                  target
                  label
               }
            }
         }
         options: wp {
            ...GlobalNavigation
         }
      }
   `)

   const motionMenu = {

      closed: {
         opacity: 0,
         transition: {
            when: 'afterChildren',
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      },

      open: {
         opacity: 1,
         transition: {
            when: 'beforeChildren',
            staggerChildren: shouldReduceMotion ? 0 : 0.1,
            duration: shouldReduceMotion ? 0 : 0.5,
         },
      }
   }

   const motionBackground = {

      closed: {
         opacity: 0,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      },

      open: {
         opacity: 1,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      }
   }

   const motionGradient = {
      closed: {
         opacity: 1,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      },

      open: {
         opacity: 1,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      }
   }

   const motionBorder = {

      closed: {
         opacity: 0,
         height: desktop ? 0 : 1,
         width: desktop ? 1 : 0,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      },

      open: {
         opacity: 1,
         height: desktop ? '100%' : 1,
         width: desktop ? 1 : '100%',
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      }
   }

   const motionSocial = {

      closed: {
         opacity: 0,
         translateY: -100,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      },

      open: {
         opacity: 1,
         translateY: 0,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }
      }
   }

   const [navOpen, setNavOpen ] = useRecoilState( navOpenState )
   const [focusList, setFocusList] = useState([])
   const menuRef = useRef(null)

   const { mainMenu, options } = data
   const { menuItems: { nodes } } = mainMenu
   const { acfOptionsNavigation: { navigation: { instagram, email, signup } } } = options

   useEffect(() => {
      if ( !navOpen ) { return }

      waitForEl('.mainMenu').then(() => {
         const focused = [ document.querySelector('.navBar__trigger'), ...menuRef.current.querySelectorAll( focusableElements() ) ]
         setFocusList( () => focused )
         focused[1].focus()
      })

   }, [navOpen])

   const menuItems = nodes?.map( ( item, index ) => <MainMenuItem data={ item } index={ index } key={ item.label } />)

   const handleKeydown = (e) => {
      if ( e.code === 'Escape' ) {
         setNavOpen( false )
         document.querySelector('.navBar__trigger').focus()
      }

      if ( e.code === 'Tab' ) {
         const firstEl = focusList[0]
         const lastEl = focusList[focusList.length - 1]

         if (!e.shiftKey && document.activeElement === lastEl) {
            firstEl.focus()
            return e.preventDefault()
         }

         if (e.shiftKey && document.activeElement === firstEl) {
            lastEl.focus()
            e.preventDefault()
         }
      }
   }

   return (
      <AnimatePresence>
         { navOpen &&
            <motion.nav
               className="mainMenu"
               variants={ motionMenu }
               initial='closed'
               animate={ navOpen ? 'open' : 'closed' }
               exit='closed'
               key='mainMenu'
               onKeyDown={ (e) => handleKeydown(e) }
               ref={menuRef}
            >
               <motion.div
                  className="mainMenu__bgImage"
                  variants={ motionBackground }
               />
               <motion.div
                  className="mainMenu__bgGradient"
                  variants={ motionGradient }
               />
               <div className="mainMenu__wrapper">
                  <div className="mainMenu__primary">
                     <ul className="mainMenu__primaryWrapper">

                        { menuItems }

                     </ul>
                     <motion.div
                        className="mainMenu__primaryBorder"
                        variants={ motionBorder }
                     />
                  </div>
                  <div className="mainMenu__social">
                     <ul className="mainMenu__socialWrapper">

                        { instagram.link.url &&
                           <motion.li
                              className="mainMenu__socialItem"
                              variants={ motionSocial }
                              data-current-page={ window.location.pathname === instagram.link.url ? true : false }
                           >
                              <div className="mainMenu__socialIcon">
                                 <IconInstagram />
                              </div>
                              <Link className="mainMenu__socialLink" to={ instagram.link.url } target={ instagram.link.target }>
                                 { instagram.text ? instagram.text : 'Instagram' }
                              </Link>
                           </motion.li>
                        }

                        { email.address.url &&
                           <motion.li
                              className="mainMenu__socialItem"
                              variants={ motionSocial }
                              data-current-page={ window.location.pathname === email.address.url ? true : false }
                           >
                              <div className="mainMenu__socialIcon">
                                 <IconEmail />
                              </div>
                              <Link className="mainMenu__socialLink" to={ email.address.url } target={ email.address.target } >
                                 { email.text ? email.text : 'Email' }
                              </Link>
                           </motion.li>
                        }

                        { signup.text &&
                           <motion.li
                              className="mainMenu__socialSignup mainMenu__socialItem"
                              variants={ motionSocial }
                           >
                              <h6 className="mainMenu__socialSignupTitle">
                                 { signup.text ? signup.text : 'Sign Up' }
                              </h6>
                              <FormBlock formId={ signup } blockClass='mainMenu__socialSignupForm' />
                           </motion.li>
                        }

                     </ul>
                  </div>
               </div>
            </motion.nav>
         }
      </AnimatePresence>
   )
}

export const MainMenuItem = ({ data, index }) => {
   const shouldReduceMotion = useReducedMotion()
   const motionPrimary = {

      closed: {
         opacity: 0,
         translateY: -100,
         transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
         }

      },

      open: i => ({
         opacity: 1,
         translateY: 0,
         transition: {
            delay: shouldReduceMotion ? 0 : i * 0.1,
            duration: shouldReduceMotion ? 0 : 0.5,
         },
      })
   }

   const setNavOpen = useSetRecoilState( navOpenState )

   const { url, target, label } = data
   const targetClass = target === '_blank' ? '-external' : ''

   const handleClickCurrentPage = (e) => {
      if ( e.target.classList.contains('-currentPage') ) {
         setNavOpen( false )
      }
   }
   return (
      <motion.li
         className={`mainMenu__primaryItem ${ targetClass }` }
         variants={ motionPrimary }
         custom={ index }
      >
         <Link className="mainMenu__primaryLink" to={ url } target={ target } onClick={handleClickCurrentPage}>
            { label }
         </Link>
         <div className="mainMenu__primaryLinkIcon">
               <IconArrowDouble />
         </div>
         {/* { target === '_blank' &&
            <div className="mainMenu__primaryLinkExternalIcon">
               <IconExternalLink />
            </div>
         } */}

      </motion.li>
   )
}