import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { getStateName } from '../../functions/locations'
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
         <ul className='footer__locationsWrapper'>
            <li className='footer__locationsState' key={ abbr }>
               { state }
               <ul className='footer__locationsStateWrapper'>
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
                              <a className="footer__socialLink" href={ `mailto:${email.address}` } target='_blank' rel='noreferrer' >
                                 { email.text ? email.text : 'Email' }
                              </a>
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
                     <form className="footer__signupForm">
                        <input className="footer__signupInput" type="text" placeholder="name@email.com" />
                        <button className="footer__signupButton" type="submit">
                           { signup.buttonText ? signup.buttonText : 'Submit' }
                        </button>
                     </form>
                  </div>
               }
               <div className="footer__brand">
                  <IconLogoColor />
               </div>
            </div>

      </footer>
   )
}