import { graphql } from "gatsby"

export const imageBlockFragments = graphql`

   fragment HeroImageBlock on WpPage_Acf_Hero_Contentdesigner_ImageBlock {
      fieldGroupName
      image {
         altText
         caption
         localFile {
            ...HeroImage
            publicURL
         }
         mediaDetails {
            width
            height
         }
      }
   }

   fragment ImageBlock on WpPage_Acf_pagesection_Contentdesigner_ImageBlock {
      fieldGroupName
      image {
         altText
         caption
         localFile {
            ...HeroImage
            publicURL
         }
         mediaDetails {
            width
            height
         }
      }
   }

   fragment LocationImageBlock on WpLocation_Acf_pagesection_Contentdesigner_ImageBlock {
      fieldGroupName
      image {
         altText
         caption
         localFile {
            ...HeroImage
            publicURL
         }
         mediaDetails {
            width
            height
         }
      }
   }
`