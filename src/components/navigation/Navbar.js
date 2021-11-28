/* eslint-disable arrow-body-style */
// React / Gatsby --------------------------------------------------
import React, { useEffect, useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'
// Data ------------------------------------------------------------

// Components -----------------------------------------------------------
import { NavTrigger } from './NavTrigger'
import { IconLogoTitle } from '../icons/IconLogoTitle'
import { IconUSA } from '../icons/IconUSA'
import { IconInstagram } from '../icons/IconInstagram'
import { IconArrowSimple } from '../icons/IconArrowSimple'

// Hooks -----------------------------------------------------------
import { BreakpointDesktop } from '../utility/Breakpoints'

// Store -----------------------------------------------------------

// =================================================================

export const Navbar = () => {
   const data = useStaticQuery(graphql`
      query NavBarData {
         wp {
            acfOptionsNavigation {
               navBar {
                  quickLinks {
                     name
                     link {
                        target
                        title
                        url
                     }
                     icon {
                        altText
                        sourceUrl
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
                     icon {
                        sourceUrl
                     }
                     cities {
                        ... on WpLocation {
                           title
                           uri
                        }
                     }
                  }
                  instagram {
                     url
                  }
               }
            }

         }
      }
   `)
   const { wp: { acfOptionsNavigation: { navBar } } } = data
   const { quickLinks, locations, instagram } = navBar
   const navLinks = quickLinks.map( ( navLink ) => <NavLink key={ navLink.name } data={ navLink } /> )

   return (
      <nav className="navBar">
         <NavTrigger />
         <NavTitle />
         <BreakpointDesktop>
            { navLinks }
            <NavLocations icon={ <IconUSA /> } locations={ locations } />
         </BreakpointDesktop>
         <NavInstagram url={ instagram.url } />
      </nav>
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

export const NavInstagram = ( props ) => {
   const { url } = props

   return (
      <a className="navBar__instagram" href={ url } target="_blank">
         <IconInstagram />
      </a>
   )
}

export const NavLink = ( props ) => {
   const { data } = props
   const {name, icon, link } = data

   return (
      <div className="navBar__cta">
         <div className="navBar__ctaIcon">
            <img alt={ icon.altText } src={ icon.sourceUrl } />
         </div>
         <a className="navBar__ctaLink" href={ link.url } target={ link.target }>{ name }</a>
         <div className="navBar__ctaArrow">
            <IconArrowSimple />
         </div>
      </div>
   )
}

export const NavLocations = ( props ) => {
   const { icon, locations = [] } = props
   const locationList = locations.map( ( location ) => <NavLocationGroup key={ location.state } location={ location } /> )
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
   const { location } = props
   const { icon, link, state, cities } = location

   const [ menuOpen, setMenuOpen ] = useState(false)

   const cityList = cities.map( ( city ) => {
      const { uri, title } = city

      return (
         <li className="navBar__locationCity" key={ city.title }>
            <a href={ uri } className="navBar__locationCityLink">
               <span>{ title }</span>
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
            <img src={ icon.sourceUrl } alt={ link.title } />
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

