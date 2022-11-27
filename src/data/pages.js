import { graphql } from "gatsby"

export const pageFragments = graphql`
   fragment DefaultPageContent on WpPage {
      title
      uri
      databaseId
      acf {
         hero {
            sectioneyebrow
            sectionstyle
            sectiontitle
            graphicversion
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
               ...HeroTextBlock
               ...HeroButtonBlock
               ...HeroImageBlock
               ...HeroCalloutBlock
               ...HeroTextImageBlock
               ...HeroFormBlock
               ...HeroCardGridBlock
            }
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
               ...TextBlock
               ...ButtonBlock
               ...ImageBlock
               ...CalloutBlock
               ...TextImageBlock
               ...FormBlock
               ...CardGridBlock
            }
         }
      }
   }
`