/* eslint-disable arrow-body-style */
// React / Gatsby --------------------------------------------------
import React from 'react'
import { useRecoilState} from 'recoil'

// Components -----------------------------------------------------------
import { IconMenuTrigger } from '../icons/IconMenuTrigger'
import { IconLogoTitle } from '../icons/IconLogoTitle'
import { IconFlower } from '../icons/IconFlower'
import { IconTruck } from '../icons/IconTruck'
import { IconUSA } from '../icons/IconUSA'
import { IconMass } from '../icons/IconMass'
import { IconMaine } from '../icons/IconMaine'
import { IconInstagram } from '../icons/IconInstagram'

// Hooks -----------------------------------------------------------
import { BreakpointDesktop } from '../utility/Breakpoints'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'

// =================================================================

export const Navbar = () => {

   return (
      <nav className="navBar">
         <NavTrigger />
         <NavTitle />
         <BreakpointDesktop>
            <>
               <NavLink1 />
               <NavLink2 />
               <NavLocations />
            </>
         </BreakpointDesktop>
         <NavInstagram />
      </nav>
   )
}

export const NavTrigger = () => {
   const [ navOpen, setNavOpen ] = useRecoilState( navOpenState )
   const onToggleNavOpen = () => setNavOpen( (currentState) => (!currentState) )

   return (
      <button className="navBar__trigger" type="button" onClick={onToggleNavOpen}>
         <IconMenuTrigger />
      </button>
   )
}

export const NavTitle = () => {

   return (
      <a href="/" type="button" className="navBar__title">
         <IconLogoTitle />
      </a>
   )
}

export const NavInstagram = () => {

   return (
      <a className="navBar__instagram" href="https://www.instagram.com" target="_blank">
         <IconInstagram />
      </a>
   )
}

export const NavLink1 = () => {

   return (
      <>
         <img src="" alt="" />
         <a href="/">Our Products</a>
      </>
   )
}

export const NavLink2 = () => {

   return (
      <>
         <img src="" alt="" />
         <a href="/">Adult Use Delivery</a>
      </>
   )
}

export const NavLocations = () => {

   return (
      <>
         <img src="" alt="" />
         <a href="/">MA</a>
         <a href="/">ME</a>
      </>
   )
}


//Mobile
// Title
// Instagram
// Trigger

//Desktop
// Trigger
// Title
// Link 1 (our products)
// Link 2 (Adult use deliver)
// Locations (us logo, MA, ME)
// Instagram