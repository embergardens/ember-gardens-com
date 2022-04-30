import React from "react"
import Link from "../navigation/Link"

import { IconArrowDouble } from '../icons/IconArrowDouble'

export const ListingRow = ({ rows }) => {

   const listings = rows.map( ( row, index ) => {
      const { label, featuredTile, listingTiles } = row

      const tiles = listingTiles.map( (tile, index) => <ListingTile tile={ tile } key={ `${tile.title}-${index}`} label={ label } /> )

      return (
         <div className="listingRow" key={`${label}-${index}`}>
            { label &&
               <div className="listingRow__label">{ label }</div>
            }
            <div className="listingRow__wrapper">
               { featuredTile &&
                  <ListingTile tile={ featuredTile[0] } isFeatured={ true } label={ label } />
               }
               { listingTiles &&
                  <>
                     { tiles }
                  </>
               }
            </div>
         </div>
      )
   })

   return (
      <div className="listings">
         { listings }
      </div>
   )
}

export const ListingTile = ({ tile, label, isFeatured = false }) => {
   const { title, links, description = null } = tile

   const linkList = links.map( (tileLink, index) => {
      const { link: { title: linkTitle, target, url } } = tileLink

      return (
         <Link className="listingTile__link" to={ url } target={ target } key={ `${linkTitle}-${index}` } aria-label={ `${label ? label : ''}: ${ title } - ${ linkTitle }`}>
            { linkTitle }
            <span>
               <IconArrowDouble />
            </span>
         </Link>
      )
   })

   return (
      <div className={ `listingTile ${ isFeatured ? '-featured' : '' }` }>
         <div className="listingTile__title">{ title }</div>
         { description &&
            <div className="listingTile__text">{ description }</div>
         }
         { links &&
            <div className="listingTile__linkList">
               { linkList }
            </div>
         }

      </div>
   )
}