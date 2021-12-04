// React / Gatsby --------------------------------------------------
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useRecoilValue} from 'recoil'

// Plugins ---------------------------------------------------------
import { motion } from 'framer-motion'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'

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

   const menuItems = nodes.map( ( item ) => <MainMenuItem data={item} key={item.label} />)

   return (
      <>
      { navOpen &&
         <nav className="mainMenu">
            <div className="mainMenu__bgImage" />
            <div className="mainMenu__bgGradient" />
            <div className="mainMenu__wrapper">
               <ul className="mainMenu__primary">

                  { menuItems }

               </ul>

               <ul className="mainMenu__social">

                  { instagram.link.url &&
                     <li className="mainMenu__socialItem">
                        <a className="mainMenu__socialLink" href={ instagram.link.url } target={ instagram.link.target }>
                           { instagram.text ? instagram.text : 'Instagram' }
                        </a>
                     </li>
                  }

                  { twitter.link.url &&
                     <li className="mainMenu__socialItem">
                        <a className="mainMenu__socialLink" href={ twitter.link.url } target={ twitter.link.target }>
                           { twitter.text ? twitter.text : 'Twitter' }
                        </a>
                     </li>
                  }

                  { email.address &&
                     <li className="mainMenu__socialItem">
                        <a className="mainMenu__socialLink" href={ `mailto:${email.address}` } target='_blank' rel='noreferrer' >
                           { email.text ? email.text : 'Email' }
                        </a>
                     </li>
                  }

                  { signup.text &&
                     <li className="mainMenu__socialSignup mainMenu__socialItem">
                        <h6 className="mainMenu__socialSignupTitle">
                           { signup.text ? signup.text : 'Sign Up' }
                        </h6>
                        <form className="mainMenu__socialSignupForm">
                           <input type="text" placeholder="name@email.com" />
                           <button type="submit">
                              { signup.buttonText ? signup.buttonText : 'Submit' }
                           </button>
                        </form>
                     </li>
                  }

               </ul>
            </div>
         </nav>
      }
      </>
   )
}

export const MainMenuItem = ({ data }) => {
   const { url, target, label } = data
   return (
      <li className="mainMenu__primaryItem">
         <a className="mainMenu__primaryLink" href={ url } target={ target } >
            { label }
         </a>
      </li>
   )
}