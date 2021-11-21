/* eslint-disable arrow-body-style */
// React / Gatsby --------------------------------------------------
import React, { useState } from 'react'
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
import { IconArrowSimple } from '../icons/IconArrowSimple'

// Hooks -----------------------------------------------------------
import { BreakpointDesktop } from '../utility/Breakpoints'

// Store -----------------------------------------------------------
import { navOpenState } from '../../store/navigation'

// =================================================================

const deliveryLocations = [
   {
      icon: <IconMass />,
      name: 'Massachusetts',
      label: 'MA',
      url: '/locations/ma',
      cities: [
         {
            cityName: 'Boston',
            cityUrl: '/locations/ma/boston',
         },
         {
            cityName: 'Orleans',
            cityUrl: '/locations/ma/orleans',
         },
         {
            cityName: 'New Bedford',
            cityUrl: '/locations/ma/new-bedford',
         },
      ],
   },
   {
      icon: <IconMaine />,
      name: 'Maine',
      label: 'ME',
      url: '/locations/me',
      cities: [
         {
            cityName: 'Greenville',
            cityUrl: '/locations/me/greenville',
         },
         {
            cityName: 'Portland',
            cityUrl: '/locations/me/portland',
         },
      ],
   },
]

export const Navbar = () => {

   return (
      <nav className="navBar">
         <NavTrigger />
         <NavTitle />
         <BreakpointDesktop>
            <NavLink title="Our Products" url="/">
               <IconFlower />
            </NavLink>

            <NavLink title="Adult Use Delivery" url="/">
               <IconTruck />
            </NavLink>

            <NavLocations icon={ <IconUSA /> } locations={ deliveryLocations } />
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
         <div className="navBar__titleWrapper">
            <IconLogoTitle />
         </div>
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

export const NavLink = ( props ) => {
   const { children, title, url, target } = props

   return (
      <div className="navBar__cta">
         <div className="navBar__ctaIcon">
            { children }
         </div>
         <a className="navBar__ctaLink" href={ url } target={ target }>{ title }</a>
         <div className="navBar__ctaArrow">
            <IconArrowSimple />
         </div>
      </div>
   )
}

export const NavLocations = ( props ) => {
   const { icon, locations = [] } = props
   const locationList = locations.map( ( state ) => <NavLocationGroup key={ state.label } state={ state } /> )
   return (
      <nav className="navBar__locations">
         <div className="navBar__locationsIcon">
            { icon }
         </div>
         { locationList }
      </nav>
   )
}

export const NavLocationGroup = ( props ) => {
   const { state } = props
   const { icon, name, url, label, cities } = state

   const [ menuOpen, setMenuOpen ] = useState(false)

   const cityList = cities.map( ( city ) => {
      const { cityUrl, cityName } = city

      return (
         <li className="navBar__locationCity" key={ city.cityName }>
            <a href={ cityUrl } className="navBar__locationCityLink">
               <span>{ cityName }</span>
               <div className="navBar__locationCityArrow">
                  <IconArrowSimple />
               </div>
            </a>
         </li>
      )
   })

   return (
      <div className="navBar__locationGroup">
         <div className="navBar__locationGroupIcon">
            { icon }
         </div>
         <a
            className="navBar__locationGroupLink"
            href={ url }
            aria-label={ name }
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
         >
            { label }
         </a>
         { cities.length > 0 && menuOpen &&
            <div
               className="navBar__locationCities"
               onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            >
               <ul className="navBar__locationCitiesWrapper">
                  { cityList }
               </ul>
            </div>
         }

      </div>
   )

}
