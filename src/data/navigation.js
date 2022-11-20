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
                     id
                     uri
                     slug
                  }
               }
               cities {
                  ... on WpLocation {
                     id
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
               address {
                  url
                  target
               }
               text
            }
            signup {
               gravityFormSelect
               text
            }
         }
      }
   }
`