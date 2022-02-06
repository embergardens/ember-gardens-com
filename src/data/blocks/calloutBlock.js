import { graphql } from "gatsby"

export const calloutBlockFragments = graphql`

   fragment HeroCalloutBlock on WpPage_Acf_Hero_Contentdesigner_CalloutBlock {
      fieldGroupName
      callout {
         alignment
         eyebrow
         text
         title
         link {
            target
            title
            url
         }
         background {
            image {
               altText
               localFile {
                  ...HeroImage
                  publicURL
               }
            }
            brightness
            color
            size
         }
      }
   }

   fragment CalloutBlock on WpPage_Acf_pagesection_Contentdesigner_CalloutBlock {
      fieldGroupName
      callout {
         alignment
         eyebrow
         text
         title
         link {
            target
            title
            url
         }
         background {
            image {
               altText
               localFile {
                  ...HeroImage
                  publicURL
               }
            }
            brightness
            color
            size
         }
      }
   }

   fragment LocationCalloutBlock on WpLocation_Acf_pagesection_Contentdesigner_CalloutBlock {
      fieldGroupName
      callout {
         alignment
         eyebrow
         text
         title
         link {
            target
            title
            url
         }
         background {
            image {
               altText
               localFile {
                  ...HeroImage
                  publicURL
               }
            }
            brightness
            color
            size
         }
      }
   }
`