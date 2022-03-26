import { graphql } from "gatsby";

export const footerFragments = graphql`
   fragment GlobalFooter on Wp {
      acfOptionsGlobal {
         globalOptions {
            footerOptions {
               footerLinks {
                  link {
                     target
                     title
                     url
                  }
               }
               backgroundImage {
                  altText
                  ...GatsbyHeroImage
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