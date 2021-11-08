import React  from "react"
import Seo from '../../components/layout/Seo'

const Post = ({ pageContext }) => {
   const post = pageContext.post

   return (
      <>

         <Seo title={post.title} />
         <h1>
            {post.title}
         </h1>
         <div dangerouslySetInnerHTML={{__html: post.content}} />

      </>
   )
}

export default Post