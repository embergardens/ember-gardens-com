import React from 'react'
import Link from '../navigation/Link'

export const ButtonBlock = ({ group }) => {

   const buttons = group.map( ( btn, index ) => {
      const { style, button } = btn
      return (
         <Link className={`button -${ style }`} to={ button.url } target={ button.target } key={ `${button.title}-${index}` }>
            { button.title }
         </Link>
      )
   })

   return (
      <div className="buttonBlock">
         { buttons }
      </div>
   )
}