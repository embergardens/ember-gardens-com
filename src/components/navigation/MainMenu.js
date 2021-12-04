// React / Gatsby --------------------------------------------------
import React from 'react'
import { useRecoilValue} from 'recoil'

// Plugins ---------------------------------------------------------
import { motion } from 'framer-motion'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'

export const MainMenu = () => {
   const navOpen = useRecoilValue( navOpenState )

   return (
      <>
      { navOpen &&
         <nav className="mainMenu">
            <div className="mainMenu__bgImage" />
            <div className="mainMenu__bgGradient" />
            <div className="mainMenu__wrapper">
               <ul className="mainMenu__primary">
                  <li className="mainMenu__primaryItem">
                     <a className="mainMenu__primaryLink" href="/">Products</a>
                  </li>
                  <li className="mainMenu__primaryItem">
                     <a className="mainMenu__primaryLink" href="/">Products</a>
                  </li>
                  <li className="mainMenu__primaryItem">
                     <a className="mainMenu__primaryLink" href="/">Products</a>
                  </li>
                  <li className="mainMenu__primaryItem">
                     <a className="mainMenu__primaryLink" href="/">Products</a>
                  </li>
               </ul>

               <ul className="mainMenu__social">
                  <li className="mainMenu__socialItem">
                     <a className="mainMenu__socialLink" href="/">Follow us on Instagram</a>
                  </li>
                  <li className="mainMenu__socialItem">
                     <a className="mainMenu__socialLink" href="/">Follow us on Instagram</a>
                  </li>
                  <li className="mainMenu__socialItem">
                     <a className="mainMenu__socialLink" href="/">Follow us on Instagram</a>
                  </li>
                  <li className="mainMenu__socialSignup mainMenu__socialItem">
                     <h6 className="mainMenu__socialSignupTitle">Join our mailing list.</h6>
                     <form className="mainMenu__socialSignupForm">
                        <input type="text" placeholder="name@email.com" />
                        <button type="submit">Sign up</button>
                     </form>
                  </li>
               </ul>
            </div>
         </nav>
      }
      </>
   )
}