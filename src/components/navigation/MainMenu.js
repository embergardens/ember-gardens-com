// React / Gatsby --------------------------------------------------
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useRecoilValue} from 'recoil'
import { useMediaQuery } from 'react-responsive'

// Plugins ---------------------------------------------------------
import { AnimatePresence, motion } from 'framer-motion'

// Components ------------------------------------------------------
import Link from './Link'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'
import { isDesktop } from '../utility/Breakpoints'

// Icons -----------------------------------------------------------
import { IconArrowDouble } from '../icons/IconArrowDouble'
import { IconEmail } from '../icons/IconEmail'
import { IconExternalLink } from '../icons/IconExternalLink'
import { IconInstagram } from '../icons/IconInstagram'
import { IconTwitter } from '../icons/IconTwitter'

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
            acfOptionsNavigation {
               navigation {
                  instagram {
                     link {
                        url
                        target
                     }
                     text
                  }
                  twitter {
                     link {
                        url
                        target
                     }
                     text
                  }
                  email {
                     address
                     text
                  }
                  signup {
                     buttonText
                     text
                  }
               }
            }
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
         }
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

   const navOpen = useRecoilValue( navOpenState )

   const { mainMenu, options } = data
   const { menuItems: { nodes } } = mainMenu
   const { acfOptionsNavigation: { navigation: { instagram, twitter, email, signup } } } = options

   const menuItems = nodes.map( ( item, index ) => <MainMenuItem data={ item } index={ index } key={ item.label } />)

   return (
      <AnimatePresence>
         { navOpen &&
            <motion.nav
               className="mainMenu"
               variants={ motionMenu }
               initial='closed'
               animate={ navOpen ? 'open' : 'closed' }
               exit='closed'
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

                        { twitter.link.url &&
                           <motion.li
                              className="mainMenu__socialItem"
                              variants={ motionSocial }
                           >
                              <div className="mainMenu__socialIcon">
                                 <IconTwitter />
                              </div>
                              <a className="mainMenu__socialLink" href={ twitter.link.url } target={ twitter.link.target }>
                                 { twitter.text ? twitter.text : 'Twitter' }
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
                              <form className="mainMenu__socialSignupForm">
                                 <input className="mainMenu__socialSignupInput" type="text" placeholder="name@email.com" />
                                 <button className="mainMenu__socialSignupButton" type="submit">
                                    { signup.buttonText ? signup.buttonText : 'Submit' }
                                 </button>
                              </form>
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

   const { url, target, label } = data
   const targetClass = target === '_blank' ? '-external' : ''
   return (
      <motion.li
         className={`mainMenu__primaryItem ${ targetClass }` }
         variants={ motionPrimary }
         custom={ index }
      >
         <Link className="mainMenu__primaryLink" to={ url } target={ target } >
            { label }
         </Link>
         <div className="mainMenu__primaryLinkIcon">
               <IconArrowDouble />
         </div>
         { target === '_blank' &&
            <div className="mainMenu__primaryLinkExternalIcon">
               <IconExternalLink />
            </div>
         }

      </motion.li>
   )
}