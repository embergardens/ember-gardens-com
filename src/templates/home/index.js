import React from 'react'
import { graphql, Link } from "gatsby"
import { ContentWrapper } from '../../components/layout/ContentWrapper'
import Seo from '../../components/layout/Seo'

import { IconLogoMountains } from '../../components/icons/IconLogoMountains'

const Home = ({ data }) => {
   const { page } = data
   const { title, featuredImage, excerpt, uri } = page

   return (
      <>
         <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />
         <div className='home-template homepage' >
            <ContentWrapper layout="splash" image={ featuredImage } gradient='default' >
               <section className="homepage__wrapper">
                  <div className="homepage__content">
                     <div className="homepage__logo">
                        <IconLogoMountains />
                     </div>
                  </div>
                  <div className="homepage__footer">
                     <Link className="homepage__button button -full" to='/shop'>
                        Order now
                     </Link>
                     <Link className="homepage__button button -half" to='/products'>
                        Craft made products
                     </Link>
                  </div>
               </section>
            </ContentWrapper>
         </div>
      </>
   )
}

export const query = graphql`
   query home($id: String!) {
      page: wpPage(id: { eq: $id }) {
         ...PageContent
      }
   }
`
export default Home