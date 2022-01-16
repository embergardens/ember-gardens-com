import React from 'react'
import { kebabCase } from 'lodash'

export const SectionNav = ({ items }) => {
   const sections = items.map( ( section ) => {
      const sectionName = section.navigationtitle || section.sectiontitle
      return (
         <>
            { section.showinnav &&
               <li className="sectionNav__item">
                  <SectionNavLink section={ sectionName } key={ sectionName } />
               </li>
            }
         </>
      )
   })

   return (
      <>
         { sections &&
            <nav className="sectionNav">
               <ul className="sectionNav__list">
                  { sections }
               </ul>
            </nav>
         }
      </>
   )
}

export const SectionNavLink = ({ section }) => {
   const hash = `#${ kebabCase( section ) }`

   return (
      <a className="sectionNav__link" href={ hash }>
         { section }
      </a>
   )
}