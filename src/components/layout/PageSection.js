import React from 'react'
import { ContentDesigner } from '../content/ContentDesigner'

export const PageSection = ({ data }) => {
   const {
      sectionstyle: style,
      sectiontitle: title,
      contentdesigner: content,
      sectioneyebrow: eyebrow,
      hero
   } = data

   return (
      <section className={`pageSection -${ style }`}>
         { hero &&
            <>
               { eyebrow &&
                  <div className="sectionEyebrow">
                     { eyebrow }
                  </div>
               }
               <h1>
                  { title }
               </h1>
            </>
         }

         { ! hero &&

         <h3 className="sectionTitle">
               { title }
            </h3>

         }
         <ContentDesigner blocks={ content } />
      </section>
   )

}