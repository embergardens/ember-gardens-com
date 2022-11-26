/* eslint-disable arrow-body-style */
// React / Gatsby --------------------------------------------------
import React, { useState, useRef, useEffect } from 'react'
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
import { IconLocationPin } from '../icons/IconLocationPin'

// Hooks -----------------------------------------------------------
import { BreakpointDesktop, BreakpointNotDesktop, BreakpointNotSmallDesktop } from '../utility/Breakpoints'
import Link from './Link'
import { getStateName } from '../../functions/locations'
import { waitForEl } from '../../functions/utility'

// Store -----------------------------------------------------------

// =================================================================

export const Navbar = () => {
   const data = useStaticQuery(graphql`
      query NavBarData {
         wp {
            ...GlobalNavigation
         }
      }
   `)
   const { wp: { acfOptionsNavigation: { navigation } } } = data
   const { quickLinks, locationsLinkType, locationsQuickLink, locations, instagram } = navigation
   const navLinks = quickLinks.map( ( navLink, index ) => <NavLink key={ navLink.name } index={ index } data={ navLink } /> )

   return (
      <nav className="navBar" v-cloak="true">
         <NavTrigger />
         <NavTitle />
         <BreakpointDesktop>
            { navLinks }
            { !locationsLinkType &&
               <NavLink key={ locationsQuickLink.name } index={ 2 } data={ locationsQuickLink } />
            }
            { locationsLinkType &&
               <NavLocations icon={ <IconUSA /> } locations={ locations } />
            }
         </BreakpointDesktop>
         <NavInstagram url={ instagram.link } />
      </nav>
   )
}

export const NavTitle = () => {

   return (
      <Link to="/" type="button" className="navBar__title">
         <div className="navBar__titleWrapper">
            <BreakpointNotDesktop>
               <IconLogoTitleMobile />
            </BreakpointNotDesktop>
            <BreakpointDesktop>
               <IconLogoTitle />
            </BreakpointDesktop>
         </div>
      </Link>
   )
}

export const NavInstagram = ( props ) => {
   const { url } = props

   return (
      <Link className="navBar__instagram" to={ url.url } target={ url.target } rel="noreferrer">
         <div className='sr-only'>Instagram</div>
         <IconInstagram />
      </Link>
   )
}

export const NavLink = ( props ) => {
   const { data, index } = props
   const {name, link } = data
   const [ isHover, setIsHover ] = useState( false )
   const [ isCurrent, setCurrent ] = useState( false )

   useEffect(() => {
      setCurrent(() => window.location.pathname === link.url)
   }, [window.location.pathname])

   return (
      <div
         className="navBar__cta"
         onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)}
         data-current-page={isCurrent}
      >
         <div className="navBar__ctaIcon">
            { index === 0 &&
               <IconFlower />
            }
            { index === 1 &&
               <IconTruck />
            }
            { index === 2 &&
               <IconLocationPin />
            }
         </div>
         <Link className="navBar__ctaLink" to={ link.url } target={ link.target } tabIndex={ isCurrent ? -1 : 0 }>{ name }</Link>
         <BreakpointNotSmallDesktop>
            <div className="navBar__ctaArrow">
               <IconArrowSimple isHover={ isHover } animate />
            </div>
         </BreakpointNotSmallDesktop>
      </div>
   )
}

export const NavLocations = ( props ) => {
   const { icon, locations = [] } = props
   const locationList = locations.map( ( location ) => <NavLocationGroup key={ location.state } location={ location } /> )
   return (
      <nav className="navBar__locations">
         { locationList }
      </nav>
   )
}

export const NavLocationGroup = ( props ) => {
   const { location } = props
   const { link, state, cities } = location

   const [ menuOpen, setMenuOpen ] = useState(false)

   const cityWrapperRef = useRef()

   const handleKeyDown = (e, isLink = false ) => {
      const key = e.code

      if ( ( key === 'Enter' || key === 'Space' ) && ! isLink ) {
         setMenuOpen( !menuOpen )
         if ( !menuOpen ) {
            waitForEl('.navBar__locationCityLink').then(() => {
               cityWrapperRef.current.querySelector('.navBar__locationCityLink').focus()
            })
         }
      }

      if ( key === 'Escape' ) {
         setMenuOpen(false)
      }
   }

   const handleBlur = (e) => {
      if ( !e.currentTarget.contains(e.relatedTarget) ) {
         setMenuOpen(false)
      }
   }

   const cityList = cities.map( ( city ) => {
      const { uri, title } = city

      return (
         <li className="navBar__locationCity" key={ city.title }>
            <Link
               to={ uri }
               className="navBar__locationCityLink"
               onClick={ () => setMenuOpen(false) }
               onKeyDown={ (e) => handleKeyDown(e, true) }
            >
               <span>{ title }</span>
               <div className="navBar__locationCityArrow">
                  <IconArrowDouble />
               </div>
            </Link>
         </li>
      )
   })

   return (
      <div className="navBar__locationGroup" onBlur={ (e) => handleBlur(e) }>
         <div className="navBar__locationGroupIcon">
            { state === 'ME' &&
               <IconMaine />
            }
            { state === 'MA' &&
               <IconMass />
            }
         </div>
         <Link
            className="navBar__locationGroupLink"
            to={ link.url }
            aria-label={ `Click to view ${getStateName( state )} locations.` }
            // onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={ () => setMenuOpen(false)}
            onClick={ () => setMenuOpen(true) }
            onKeyDown={ (e) => handleKeyDown(e) }
            tabIndex="0"
         >
            { state }
         </Link>
         { cities.length > 0 && menuOpen &&
            <div
               className="navBar__locationCities"
               onMouseEnter={() => setMenuOpen(true)}
               onMouseLeave={() => setMenuOpen(false)}
            >
               <ul className="navBar__locationCitiesWrapper" ref={ cityWrapperRef }>
                  { cityList }
               </ul>
            </div>
         }

      </div>
   )

}

