import React from 'react'
import { RecoilRoot } from 'recoil'
import Layout from './src/components/layout/Layout'

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// custom CSS styles
import "./src/css-dev/style.scss"

// eslint-disable-next-line arrow-body-style
export const wrapRootElement = ({ element }) => {

   return (
      <RecoilRoot>
         <Layout>
            {element}
         </Layout>
      </RecoilRoot>
   )
}
