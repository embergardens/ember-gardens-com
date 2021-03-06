//import React, { Suspense } from 'react'
import React from 'react'
import { graphql } from "gatsby"
import Link from '../../components/navigation/Link'
import { ContentWrapper } from '../../components/layout/ContentWrapper'
import Seo from '../../components/layout/Seo'
import HomepageVideo from '../../components/video/HomepageVideo'

// import VideoLoadingScreen from '../../components/navigation/VideoLoadingScreen'
// const HomepageVideo = React.lazy( () => import( '../../components/video/HomepageVideo' ) )
// reference: https://www.harrytheo.com/blog/2021/08/lazy-loading-react-components/

const Home = ({ data }) => {
   const { page } = data
   const { title, featuredImage, excerpt, uri,
      template: {
         homepageTemplate: {
            buttongroup,
            ...videoUploads
         }
      }
   } = page

   const buttons = buttongroup.map( ( btn, index ) => {
      const { style, button } = btn
      return (
         <Link className={`homepage__button button -${ style }`} to={ button.url } target={ button.target } key={ `${button.title}-${index}` }>
            { button.title }
         </Link>
      )
   })

   return (
      <>
         <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />
         <div className='home-template homepage' >
            {/* <Suspense fallback={ <VideoLoadingScreen /> }>
               <HomepageVideo />
            </Suspense> */}
            <h1 className='sr-only'>{ title }</h1>
            <HomepageVideo videos={ videoUploads } />
            <ContentWrapper layout="splash">
               <section className="homepage__wrapper">
                  <div className="homepage__content">
                  </div>
                  { buttons &&
                     <div className="homepage__footer">
                        { buttons }
                     </div>
                  }
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