import React  from "react"
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'

const Post = ({ pageContext }) => {
   const post = pageContext.post

   return (
      <Layout>

         <Seo title={post.title} />
         <h1>
            {post.title}
         </h1>
         <div dangerouslySetInnerHTML={{__html: post.content}} />

      </Layout>
   )
}

export default Post