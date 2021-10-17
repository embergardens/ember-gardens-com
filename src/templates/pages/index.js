import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'

const Page = ({ pageContext }) => {
   const page = pageContext.page

   return (
      <Layout>
         <Seo title={page.title} />

         <h1>
            {page.title}
         </h1>
         <div dangerouslySetInnerHTML={{__html: page.content}} />
      </Layout>
   )
}

export default Page