import React from 'react'
import { kebabCase } from 'lodash'
import { ContentDesigner } from '../content/ContentDesigner'
import { SectionFooterNav } from '../navigation/SectionFooterNav'

export const PageSection = ({ data, pageTitle, hero = false, list, index }) => {
   const {
      navigationtitle: navTitle,
      sectionstyle: style,
      sectiontitle,
      contentdesigner: content,
      sectioneyebrow: eyebrow,
   } = data

   const idName = kebabCase( navTitle || sectiontitle || pageTitle )

   return (
      <section id={ idName } className={`pageSection -${ style }`}>
         { hero
            ?
            <>
               { eyebrow &&
                  <div className="sectionEyebrow">
                     { eyebrow }
                  </div>
               }
               <h1>
                  { sectiontitle || pageTitle }
               </h1>
            </>
            :
            <h3 className="sectionTitle">
               { sectiontitle }
            </h3>
         }

         { content &&
            <ContentDesigner blocks={ content } />
         }

         <SectionFooterNav list={list} index={ hero ? -1 : index } />
      </section>
   )

}