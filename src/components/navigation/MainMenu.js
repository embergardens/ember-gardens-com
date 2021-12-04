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
            <div className="mainMenu__bgScreen" />
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
            </div>
         </nav>
      }
      </>
   )
}