import { graphql } from "gatsby";

export const mediaFragments = graphql`
   fragment HeroImage on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, quality: 90, placeholder: BLURRED )
      }
   }

   fragment HeroHalfImage on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, quality: 90 )
      }
   }

   fragment AvatarImage on File {
      childImageSharp {
         gatsbyImageData(layout: FIXED, width: 80, height: 80, quality: 90)
      }
   }

   fragment Thumbnail on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, quality: 90)
      }
   }

   fragment SquareImage on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, width: 1000, height: 1000, quality: 90 )
      }
   }
`