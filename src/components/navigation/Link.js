/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link as GatsbyLink } from "gatsby"
import TransitionAnime from './TransitionAnime'

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {

   const internal = /^\/(?!\/)/.test(to)


  // Use Gatsby Link for internal links, and <a> for others
   if (internal) {

      return (
         <TransitionAnime
            bg="linear-gradient( 90deg, #715191, #BA5B80, #F48474)"
            to={to}
            activeClassName={activeClassName}
            partiallyActive={partiallyActive}
            duration={1.5}
            {...other}
         >
         {children}
         </TransitionAnime>
      )
   }
   return (
      <a href={to} {...other}>
         {children}
      </a>
   )
}

export default Link