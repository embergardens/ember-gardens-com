/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link as GatsbyLink } from "gatsby"
import { useRecoilState} from 'recoil'

import { activeTransitionState } from '../../store/navigation'

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {

   const internal = /^\/(?!\/)/.test(to)

   const [ activeTransition, setActiveTransition ] = useRecoilState( activeTransitionState )
   const onActivateTransition = () => setActiveTransition( true )

   const handleClick = () => {
      if ( !activeTransition ) {
         onActivateTransition()
      }
   }

  // Use Gatsby Link for internal links, and <a> for others
   if (internal) {

      return (
         <GatsbyLink
            to={to}
            activeClassName={activeClassName}
            partiallyActive={partiallyActive}
            onClick={handleClick}
            {...other}
         >
         {children}
         </GatsbyLink>
      )
   }
   return (
      <a href={to} {...other}>
         {children}
      </a>
   )
}

export default Link