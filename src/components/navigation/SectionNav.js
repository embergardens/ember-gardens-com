/* eslint-disable consistent-return */
import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentSectionState } from '../../store/navigation'

export const SectionNav = ({ items }) => {

   const sections = items.map( ( section ) => {

      if ( !section.showinnav ) {
         return
      }

      const sectionName = section.navigationtitle || section.sectiontitle

      return (
         <li className="sectionNav__item" key={ section.slug }>
            <SectionNavLink title={ sectionName } slug={section.slug} key={ section.slug } />
         </li>
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

export const SectionNavLink = ({ title, slug }) => {
   const currentSection = useRecoilValue( currentSectionState )
   const isCurrent = currentSection === slug ? '-active' : ''
   const hash = `#${ slug }`

   return (
      <a className={`sectionNav__link ${ isCurrent }`} href={ hash }>
         { title }
      </a>
   )
}