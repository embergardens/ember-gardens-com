/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import TransitionWarp from './TransitionWarp'

const Link = ({ children, to, activeClassName, partiallyActive, getProps, ...other }) => {

   const internal = /^\/(?!\/)/.test(to)


  // Use Gatsby Link for internal links, and <a> for others
   if (internal) {

      return (
         <TransitionWarp
            to={to}
            activeClassName='-currentPage'
            partiallyActive={partiallyActive}
            {...other}
         >
         {children}
         </TransitionWarp>
      )
   }
   return (
      <a href={to} {...other} data-external-link>
         {children}
      </a>
   )
}

export default Link