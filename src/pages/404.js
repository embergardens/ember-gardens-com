import React from 'react'
import { ContentWrapper } from '../components/layout/ContentWrapper';

const NotFound = ({location}) => {

   return (
      <>
         <div className='notFound-template'>
            <ContentWrapper>
               <h1>808s &amp; 404s</h1>
               <p>Sorry, { location.href } is not a page.</p>
            </ContentWrapper>
         </div>
      </>

   )
}
export default NotFound;