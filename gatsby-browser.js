/* eslint-disable no-underscore-dangle */
import React from 'react'
import { RecoilRoot } from 'recoil'
import 'what-input'
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
export const wrapPageElement = ({ element, props }) => {
   // if ( props?.pageResources?.page?.path === '/404.html' ) {
   //    return (
   //       <RecoilRoot>
   //          {element}
   //       </RecoilRoot>
   //    )
   // }

   return (
      <RecoilRoot>
            <Layout>
               {element}
            </Layout>
      </RecoilRoot>
   )
}

export const onRouteUpdate = ( loc ) => {
   if ( ! window.__tl_inTransition && ! loc.location.hash ) {
      document.querySelector('.viewportMain').scrollTo( 0, 0 );
   }
}
