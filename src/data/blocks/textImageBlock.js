import { graphql } from "gatsby"

export const textImageBlockFragments = graphql`

   fragment TextImageBlock on WpPage_Acf_pagesection_Contentdesigner_TextImageBlock {
      fieldGroupName
      imageLayout
      imageShape
      image {
         altText
         caption
         localFile {
            ...SquareImage
            publicURL
         }
         mediaDetails {
            width
            height
         }
      }
      textgroup {
         content
         eyebrow
         subtitle
         title
      }
      buttongroup {
         button {
            target
            title
            url
         }
         style
      }
   }

`