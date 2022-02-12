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
            }
            contentdesigner {
               ...HeroTextBlock
               ...HeroButtonBlock
               ...HeroImageBlock
               ...HeroCalloutBlock
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
            }
            contentdesigner {
               ...TextBlock
               ...ButtonBlock
               ...ImageBlock
               ...CalloutBlock
               ...TextImageBlock
            }
         }
      }
   }
`