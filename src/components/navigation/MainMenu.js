// React / Gatsby --------------------------------------------------
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { useMediaQuery } from 'react-responsive'

// Plugins ---------------------------------------------------------
import { AnimatePresence, motion } from 'framer-motion'
import FocusTrap from 'focus-trap-react'

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

export const MainMenu = () => {
   const desktop = useMediaQuery( useRecoilValue( isDesktop ) )

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
            when: 'afterChildren'
         }
      },

      open: {
         opacity: 1,
         transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1,
         },
      }
   }

   const motionBackground = {

      closed: {
         opacity: 0,

      },

      open: {
         opacity: 1,
      }
   }

   const motionGradient = {
      closed: {
         opacity: 1,
      },

      open: {
         opacity: 1,
      }
   }

   const motionBorder = {

      closed: {
         opacity: 0,
         height: desktop ? 0 : 1,
         width: desktop ? 1 : 0,

      },

      open: {
         opacity: 1,
         height: desktop ? '100%' : 1,
         width: desktop ? 1 : '100%'
      }
   }

   const motionSocial = {

      closed: {
         opacity: 0,
         translateY: -100

      },

      open: {
         opacity: 1,
         translateY: 0
      }
   }

   const [navOpen, setNavOpen ] = useRecoilState( navOpenState )

   const { mainMenu, options } = data
   const { menuItems: { nodes } } = mainMenu
   const { acfOptionsNavigation: { navigation: { instagram, email, signup } } } = options

   const menuItems = nodes.map( ( item, index ) => <MainMenuItem data={ item } index={ index } key={ item.label } />)

   const handleKeydown = (e) => {
      if ( e.code === 'Escape' ) {
         setNavOpen( false )
         document.querySelector('.navBar__trigger').focus()
      }
   }

   return (
      <AnimatePresence>
         { navOpen &&
            <FocusTrap>
               <motion.nav
                  className="mainMenu"
                  variants={ motionMenu }
                  initial='closed'
                  animate={ navOpen ? 'open' : 'closed' }
                  exit='closed'
                  key='mainMenu'
                  onKeyDown={ (e) => handleKeydown(e) }
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
                              >
                                 <div className="mainMenu__socialIcon">
                                    <IconInstagram />
                                 </div>
                                 <a className="mainMenu__socialLink" href={ instagram.link.url } target={ instagram.link.target }>
                                    { instagram.text ? instagram.text : 'Instagram' }
                                 </a>
                              </motion.li>
                           }

                           { email.address &&
                              <motion.li
                                 className="mainMenu__socialItem"
                                 variants={ motionSocial }
                              >
                                 <div className="mainMenu__socialIcon">
                                    <IconEmail />
                                 </div>
                                 <a className="mainMenu__socialLink" href={ `mailto:${email.address}` } target='_blank' rel='noreferrer' >
                                    { email.text ? email.text : 'Email' }
                                 </a>
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
            </FocusTrap>
         }
      </AnimatePresence>
   )
}

export const MainMenuItem = ({ data, index }) => {

   const motionPrimary = {

      closed: {
         opacity: 0,
         translateY: -100

      },

      open: i => ({
         opacity: 1,
         translateY: 0,
         transition: {
            delay: i * 0.1,
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