/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import GravityFormForm from '../../../plugins/gatsby-plugin-gravity-forms-v2'

export const FormBlock = ({ formId, blockClass ='formBlock' }) => {
   const data = useStaticQuery(graphql`
      {
         allWpGfForm {
            nodes {
               ...gfForm
            }
         }
      }
   `)

   const {
      allWpGfForm: { nodes },
   } = data

   const gfId = useMemo( () => formId, [])

   const form = nodes.filter((node) => {
      if (node.databaseId === Number(gfId.gravityFormSelect)) {
         return node
      }
   })

   console.log({form})

   return (
      <div className={ blockClass }>
         <GravityFormForm data={ form[0] } />
      </div>
   )
}
