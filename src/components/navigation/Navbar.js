/* eslint-disable arrow-body-style */
// React / Gatsby --------------------------------------------------
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// Data ------------------------------------------------------------

// Components -----------------------------------------------------------
import { NavTrigger } from './NavTrigger'
import { IconLogoTitle } from '../icons/IconLogoTitle'
import { IconLogoTitleMobile } from '../icons/IconLogoTitleMobile'
import { IconUSA } from '../icons/IconUSA'
import { IconInstagram } from '../icons/IconInstagram'
import { IconArrowSimple } from '../icons/IconArrowSimple'
import { IconArrowDouble } from '../icons/IconArrowDouble'
import { IconMaine } from '../icons/IconMaine'
import { IconMass } from '../icons/IconMass'
import { IconFlower } from '../icons/IconFlower'
import { IconTruck } from '../icons/IconTruck'

// Hooks -----------------------------------------------------------
import { BreakpointDesktop, BreakpointNotDesktop, BreakpointNotSmallDesktop } from '../utility/Breakpoints'

// Store -----------------------------------------------------------

// =================================================================

export const Navbar = () => {
   const data = useStaticQuery(graphql`
      query NavBarData {
         wp {
            acfOptionsNavigation {
               navigation {
                  quickLinks {
                     name
                     link {
                        target
                        title
                        url
                     }
                  }
                  locations {
                     state
                     link {
                        ... on WpLocation {
                           uri
                           slug
                        }
                     }
                     cities {
                        ... on WpLocation {
                           title
                           uri
                        }
                     }
                  }
                  instagram {
                     link {
                        url
                        target
                     }
                  }
               }
            }

         }
      }
   `)
   const { wp: { acfOptionsNavigation: { navigation } } } = data
   const { quickLinks, locations, instagram } = navigation
   const navLinks = quickLinks.map( ( navLink, index ) => <NavLink key={ navLink.name } index={ index } data={ navLink } /> )

   return (
      <nav className="navBar">
         <NavTrigger />
         <NavTitle />
         <BreakpointDesktop>
            { navLinks }
            <NavLocations icon={ <IconUSA /> } locations={ locations } />
         </BreakpointDesktop>
         <NavInstagram url={ instagram.link } />
      </nav>
   )
}

export const NavTitle = () => {

   return (
      <a href="/" type="button" className="navBar__title">
         <div className="navBar__titleWrapper">
            <BreakpointNotDesktop>
               <IconLogoTitleMobile />
            </BreakpointNotDesktop>
            <BreakpointDesktop>
               <IconLogoTitle />
            </BreakpointDesktop>
         </div>
      </a>
   )
}

export const NavInstagram = ( props ) => {
   const { url } = props

   return (
      <a className="navBar__instagram" href={ url.url } target={ url.target } rel="noreferrer">
         <IconInstagram />
      </a>
   )
}

export const NavLink = ( props ) => {
   const { data, index } = props
   const {name, link } = data
   const [ isHover, setIsHover ] = useState( false )

   return (
      <div
         className="navBar__cta"
         onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)}
      >
         <BreakpointNotSmallDesktop>
            <div className="navBar__ctaIcon">
               { index === 0 &&
                  <IconFlower />
               }
               { index === 1 &&
                  <IconTruck />
               }
            </div>
         </BreakpointNotSmallDesktop>
         <a className="navBar__ctaLink" href={ link.url } target={ link.target }>{ name }</a>
         <div className="navBar__ctaArrow">
            <IconArrowSimple isHover={ isHover } animate />
         </div>
      </div>
   )
}

export const NavLocations = ( props ) => {
   const { icon, locations = [] } = props
   const locationList = locations.map( ( location ) => <NavLocationGroup key={ location.state } location={ location } /> )
   return (
      <nav className="navBar__locations">
         <BreakpointNotSmallDesktop>
            <div className="navBar__locationsIcon">
               { icon }
            </div>
         </BreakpointNotSmallDesktop>
         { locationList }
      </nav>
   )
}

export const NavLocationGroup = ( props ) => {
   const { location } = props
   const { link, state, cities } = location

   const [ menuOpen, setMenuOpen ] = useState(false)

   const cityList = cities.map( ( city ) => {
      const { uri, title } = city

      return (
         <li className="navBar__locationCity" key={ city.title }>
            <a href={ uri } className="navBar__locationCityLink">
               <span>{ title }</span>
               <div className="navBar__locationCityArrow">
                  <IconArrowDouble />
               </div>
            </a>
         </li>
      )
   })

   return (
      <div className="navBar__locationGroup">
         <div className="navBar__locationGroupIcon">
            { state === 'ME' &&
               <IconMaine />
            }
            { state === 'MA' &&
               <IconMass />
            }
         </div>
         <a
            className="navBar__locationGroupLink"
            href={ link.url }
            aria-label={ link.title }
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
         >
            { state }
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

