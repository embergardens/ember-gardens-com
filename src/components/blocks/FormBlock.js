/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import GravityFormForm from '../../../plugins/gatsby-plugin-gravity-forms-v2'

export const FormBlock = ({ formId }) => {
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

   const form = nodes.filter((node) => {
      if (node.databaseId === Number(formId.gravityFormSelect)) {
         return node
      }
   })

   console.log({form})

   return (
      <div className="formBlock">
         <h1>GRAVITY FORM</h1>
         <GravityFormForm data={ form[0] } />
      </div>
   )
}
