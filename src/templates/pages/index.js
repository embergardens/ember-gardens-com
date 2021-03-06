import React from 'react'
import { graphql } from "gatsby"

import Sections from '../../components/layout/Sections'

const Page = ({ data }) => <Sections data={data} postType='page' />


export const query = graphql`
   query page($id: String!) {
      page: wpPage(id: { eq: $id }) {
         ...DefaultPageContent
      }
      globalFooter: wp {
         ...GlobalFooter
      }
   }
`
export default Page