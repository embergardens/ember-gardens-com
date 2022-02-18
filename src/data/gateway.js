import { graphql } from "gatsby";

export const gatewayFragments = graphql`
   fragment Gateway on Wp {
      acfOptionsGlobal {
         globalOptions {
            gatewayOptions {
               failmessage
               failtext
               passtext
               subtitle
               title
               backgroundImage {
                  altText
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
         }
      }
   }
`