import { graphql } from "gatsby";

export const locationFragments = graphql`
   fragment LocationContent on WpLocation {
      title
      uri
      databaseId
      acf {
         hero {
            sectioneyebrow
            sectionstyle
            sectiontitle
            sectionbackground {
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
               layout
               brightness
               imageSize
               imageBackgroundColor
               textColor
            }
            text
            address
            email
            phone
            ...HeroLocationButtonBlock
         }
         footerOptions {
            hideFooter
            footerLinks {
               link {
                  target
                  title
                  url
               }
            }
         }
         pagesection {
            navigationtitle
            sectionstyle
            sectiontitle
            showinnav
            sectionbackground {
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
               layout
               brightness
               imageSize
               imageBackgroundColor
               textColor
            }
            contentdesigner {
               ...LocationTextBlock
               ...LocationButtonBlock
               ...LocationImageBlock
               ...LocationCalloutBlock
               ...LocationTextImageBlock
               ...LocationFormBlock
               ...LocationCardGridBlock
            }
         }
      }
   }
`