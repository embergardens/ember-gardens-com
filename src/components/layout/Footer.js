import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { getStateName } from '../../functions/locations'
import { FormBlock } from '../blocks/FormBlock'
import { IconEmail } from '../icons/IconEmail'
import { IconInstagram } from '../icons/IconInstagram'
import { IconLogoColor } from '../icons/IconLogoColor'
import Link from '../navigation/Link'

export const Footer = ({ links }) => {

   const data = useStaticQuery( graphql`
      query FooterBarData {
         options: wp {
            ...GlobalNavigation
         }
      }
   `)

   const { options } = data
   const { acfOptionsNavigation: { navigation: { locations, instagram, email, signup } } } = options

   const linkList = links.map( ( item ) => {
      const { link: { target, title, url } } = item
      return (
         <li className='footer__linkItem' key={ title }>
            <Link
               className='footer__linkButton'
               to={ url }
               target={ target }
               key={ title }
               >
               { title }
            </Link>
         </li>
      )
   })

   const locationList = locations.map( (location) => {
      const { cities, state: abbr } = location
      const state = getStateName( abbr )

      const cityList = cities.map( ( city ) => {
         const { uri, title } = city

         return (
            <li className='footer__locationsCity' key={title}>
               <Link
                  className='footer__locationsCityLink'
                  to={ uri }
                  key={ title }
               >
                  { title }
               </Link>
            </li>
         )
      })

      return (
         <ul className='footer__locationsWrapper' key={ abbr }>
            <li className='footer__locationsState' key={ abbr }>
               { state }
               <ul className='footer__locationsStateWrapper' key={ abbr }>
                  { cityList }
               </ul>
            </li>
         </ul>
      )
   })

   return (
      <footer className="footer">
            { links &&
               <nav className="footer__links">
                  { linkList }
               </nav>

            }
            <div className="footer__wrapper">
               { locations &&
                  <nav className="footer__locations">
                     { locationList }
                  </nav>
               }
               { ( instagram || email ) &&
                  <nav className="footer__social">
                     <ul className='footer__socialWrapper'>
                        { instagram.link.url &&
                           <li className="footer__socialItem">
                              <div className="footer__socialIcon">
                                 <IconInstagram />
                              </div>
                              <a className="footer__socialLink" href={ instagram.link.url } target={ instagram.link.target }>
                                 { instagram.text ? instagram.text : 'Instagram' }
                              </a>
                           </li>
                        }

                        { email.address &&
                           <li className="footer__socialItem">
                              <div className="footer__socialIcon">
                                 <IconEmail />
                              </div>
                              <Link className="footer__socialLink" to={ email.address.url } target={ email.address.target } >
                                 { email.text ? email.text : 'Email' }
                              </Link>
                           </li>
                        }
                     </ul>
                  </nav>
               }
               { signup &&
                  <div className="footer__signup">
                     <h6 className="footer__signupTitle">
                        { signup.text ? signup.text : 'Sign Up' }
                     </h6>
                     <FormBlock formId={ signup } blockClass='footer__signupForm' />
                  </div>
               }
               <div className="footer__brand">
                  <IconLogoColor />
               </div>
            </div>

      </footer>
   )
}