/* eslint-disable consistent-return */
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useRecoilValue } from 'recoil'
import { currentSectionState } from '../../store/navigation'

export const SectionNav = ({ items }) => {
   const currentSection = useRecoilValue( currentSectionState )
   const isFooter = currentSection === 'footer'

   const navAnime = {
      enter: {
         opacity: 1,
         translateY: 0,
      },

      exit: {
         opacity: 0,
         translateY: -150,
      }
   }

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
      <AnimatePresence>
         { sections && ! isFooter &&
            <motion.nav
               className="sectionNav"
               variants={ navAnime }
               initial='exit'
               animate='enter'
               exit='exit'
            >
               <ul className="sectionNav__list">
                  { sections }
               </ul>
            </motion.nav>
         }
      </AnimatePresence>
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