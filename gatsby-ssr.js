import React from 'react'
import {AnimatePresence} from 'framer-motion'
import { RecoilRoot } from 'recoil'
import Layout from './src/components/layout/Layout'

// custom typefaces
import "@fontsource/chivo/700.css"
import "@fontsource/titillium-web/200.css"
import "@fontsource/titillium-web/300.css"
import "@fontsource/titillium-web/300-italic.css"
import "@fontsource/titillium-web/400.css"
import "@fontsource/titillium-web/400-italic.css"
import "@fontsource/titillium-web/600.css"
import "@fontsource/titillium-web/700.css"
import "@fontsource/titillium-web/900.css"

// custom CSS styles
import "./src/css-dev/style.scss"

// eslint-disable-next-line arrow-body-style
export const wrapRootElement = ({ element }) => {

   return (
      <RecoilRoot>
         <AnimatePresence exitBeforeEnter>
            <Layout>
               {element}
            </Layout>
         </AnimatePresence>
      </RecoilRoot>
   )
}
