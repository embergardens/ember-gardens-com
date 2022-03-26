import { graphql } from "gatsby";

export const postFragments = graphql`
   fragment PostPreviewContent on WpPost {
      uri
      title
      databaseId
      excerpt
      date(formatString: "LL")
      featuredImage {
         node {
            altText
            ...GatsbyThumbnail
         }
      }
      author {
         node {
            name
            firstName
            lastName
            uri
         }
      }
      categories {
         nodes {
            name
            slug
            uri
         }
      }
   }

   fragment PostContent on WpPost {
      title
      uri
      content
      date(formatString: "LL")
      excerpt
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
      author {
         node {
            name
            firstName
            lastName
            uri
            description
            avatar {
               url
               width
               height
               ...GatsbyAvatarImage
            }
         }
      }
      categories {
         nodes {
            name
            slug
            uri
         }
      }
   }
`