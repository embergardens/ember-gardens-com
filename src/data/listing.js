import { graphql } from "gatsby"

export const listingFragments = graphql`
   fragment ListingPageContent on WpPage {
      title
      uri
      databaseId
      template {
         ... on WpListingTemplate {
            listingPageTemplate {
               background {
                  brightness
                  color
                  image {
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
               listingRow {
                  label
                  listingTiles {
                     title
                     links {
                        link {
                           target
                           title
                           url
                        }
                     }
                  }
                  featuredTile {
                     description
                     title
                     links {
                        link {
                           target
                           title
                           url
                        }
                     }
                  }
               }
            }
         }
      }
   }
`