// React / Gatsby --------------------------------------------------
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useRecoilValue} from 'recoil'

// Plugins ---------------------------------------------------------
import { AnimatePresence, motion } from 'framer-motion'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'

// Icons -----------------------------------------------------------
import { IconEmail } from '../icons/IconEmail'
import { IconExternalLink } from '../icons/IconExternalLink'
import { IconInstagram } from '../icons/IconInstagram'
import { IconTwitter } from '../icons/IconTwitter'

const motionMenu = {

   closed: {
      opacity: 0,
      translateY: '-100%',
      transition: {
         when: 'afterChildren'
      }
   },

   open: {
      opacity: 1,
      translateY: '0%',
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

const motionBorder = {

   closed: {
      opacity: 0,
      //height: 0,

   },

   open: {
      opacity: 1,
      // adjust for mobile
      //height: '100%'
   }
}

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

export const MainMenu = () => {
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
               <div className="mainMenu__bgGradient" />
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
                                 <input type="text" placeholder="name@email.com" />
                                 <button type="submit">
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
   const { url, target, label } = data
   return (
      <motion.li
         className="mainMenu__primaryItem"
         variants={ motionPrimary }
         custom={ index }
      >
         <a className="mainMenu__primaryLink" href={ url } target={ target } >
            { label }
         </a>
         { target === '_blank' &&
            <div className="mainMenu__primaryLinkIcon">
               <IconExternalLink />
            </div>
         }
      </motion.li>
   )
}