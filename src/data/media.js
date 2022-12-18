import { graphql } from "gatsby";

export const mediaFragments = graphql`
   fragment HeroImage on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, quality: 90, placeholder: DOMINANT_COLOR )
      }
   }

   fragment HeroVideoImage on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, quality: 70, placeholder: BLURRED, formats: [WEBP, AUTO], transformOptions: {fit: COVER} )
      }
   }

   fragment HeroHalfImage on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, quality: 90, placeholder: BLURRED )
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
         gatsbyImageData(layout: CONSTRAINED, width: 1000, height: 1000, quality: 90, placeholder: BLURRED )
      }
   }

   fragment LocalVideo on File {
      extension
      publicURL
   }

   fragment mp4Video on File {
      childVideoFfmpeg {
         mp4: transcode(maxWidth: 900, maxHeight: 480, fileExtension: "mp4", codec: "libx264", options:[["-profile:v", "main"], ["-pix_fmt", "yuv420p"]], outputOptions: ["-movflags faststart"]) {
            width
            src
            presentationMaxWidth
            presentationMaxHeight
            originalName
            height
            aspectRatio
         }
      }
   }

   fragment webmVideo on File {
      childVideoFfmpeg {
         webm: transcode(codec: "libvpx-vp9", maxWidth: 900, maxHeight: 480, fileExtension: "webm", outputOptions: ["-crf 20", "-b:v 0"]) {
            width
            src
            presentationMaxWidth
            presentationMaxHeight
            originalName
            height
            aspectRatio
         }
      }
   }
`