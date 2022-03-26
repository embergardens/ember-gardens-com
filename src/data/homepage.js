import { graphql } from "gatsby"

export const homepageFragments = graphql`
   fragment PageContent on WpPage {
      title
      uri
      content
      databaseId
      featuredImage {
         node {
            altText
            ...GatsbyHeroImage
            mediaDetails {
               width
               height
            }
         }
      }
      template {
         ... on WpHomepageTemplate {
            homepageTemplate {
               buttongroup {
                  button {
                     target
                     title
                     url
                  }
                  style
               }
            }
         }
      }
   }
`