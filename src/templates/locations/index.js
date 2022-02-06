import React from 'react'
import { graphql } from "gatsby"

import Sections from '../../components/layout/Sections'

const Location = ({ data }) => <Sections data={data} postType='location' />


export const query = graphql`
   query location($id: String!) {
      page: wpLocation(id: { eq: $id }) {
         ...LocationContent
      }
      globalFooter: wp {
         ...GlobalFooter
      }
   }
`
export default Location