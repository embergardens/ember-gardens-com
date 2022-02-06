import { graphql } from "gatsby";

export const navigationFragments = graphql`
   fragment GlobalNavigation on Wp {
      acfOptionsNavigation {
         navigation {
            quickLinks {
               name
               link {
                  target
                  title
                  url
               }
            }
            locations {
               state
               link {
                  ... on WpLocation {
                     uri
                     slug
                  }
               }
               cities {
                  ... on WpLocation {
                     title
                     uri
                  }
               }
            }
            instagram {
               link {
                  url
                  target
               }
               text
            }
            email {
               address
               text
            }
            signup {
               buttonText
               text
            }
         }
      }
   }
`