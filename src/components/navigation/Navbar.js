// React / Gatsby --------------------------------------------------
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'
import { isNotMobileState } from '../../store/global'

// =================================================================

export const Navbar = () => {
   const isNotMobile = useRecoilValue( isNotMobileState )

   return (
      <nav>
         <NavTrigger />
         <NavTitle />
         { isNotMobile &&
            <>
               <NavLink1 />
               <NavLink2 />
               <NavLocations />
            </>
         }
         <NavInstagram />
      </nav>
   )
}

export const NavTrigger = () => {
   const [ navOpen, setNavOpen ] = useRecoilState( navOpenState )
   const onToggleNavOpen = () => setNavOpen( (currentState) => (!currentState) )

   return (
      <button type="button" onClick={onToggleNavOpen}>Menu</button>
   )
}

export const NavTitle = () => {

   return (
      <a href="/" type="button">Ember Gardens</a>
   )
}

export const NavInstagram = () => {

   return (
      <a href="https://www.instagram.com">
         <span className="sr-only">Instagram</span>
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