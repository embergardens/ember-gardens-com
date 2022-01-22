import { graphql } from "gatsby"

export const fragments = graphql`
   fragment HeroImage on File {
      childImageSharp {
         gatsbyImageData(layout: CONSTRAINED, quality: 90)
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

   fragment GlobalFooter on Wp {
      acfOptionsGlobal {
			globalOptions {
				footerOptions {
               footerLinks {
                  link {
                     target
                     title
                     url
                  }
               }
               backgroundImage {
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
         }
      }
   }

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

   fragment PostPreviewContent on WpPost {
      uri
      title
      databaseId
      excerpt
      date(formatString: "LL")
      featuredImage {
         node {
            altText
            localFile {
               ...Thumbnail
            }
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
               imageFile {
                  ...AvatarImage
               }
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

   fragment PageContent on WpPage {
      title
      uri
      content
      databaseId
      featuredImage {
         node {
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
   }

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
            }
         }
      }
   }

   fragment HeroTextBlock on WpPage_Acf_Hero_Contentdesigner_Textblock {
      fieldGroupName
      text
   }

   fragment HeroButtonBlock on WpPage_Acf_Hero_Contentdesigner_Buttonblock {
      fieldGroupName
      buttongroup {
         button {
            target
            title
            url
         }
      }
   }

   fragment HeroImageBlock on WpPage_Acf_Hero_Contentdesigner_ImageBlock {
      fieldGroupName
      image {
         altText
         caption
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

   fragment HeroCalloutBlock on WpPage_Acf_Hero_Contentdesigner_CalloutBlock {
      fieldGroupName
      callout {
         alignment
         eyebrow
         text
         title
         link {
            target
            title
            url
         }
         background {
            image {
               altText
               localFile {
                  ...HeroImage
                  publicURL
               }
            }
            brightness
            color
            size
         }
      }
   }

   fragment TextBlock on WpPage_Acf_pagesection_Contentdesigner_Textblock {
      fieldGroupName
      text
   }

   fragment ButtonBlock on WpPage_Acf_pagesection_Contentdesigner_Buttonblock {
      fieldGroupName
      buttongroup {
         button {
            target
            title
            url
         }
         style
      }
   }

   fragment ImageBlock on WpPage_Acf_pagesection_Contentdesigner_ImageBlock {
      fieldGroupName
      image {
         altText
         caption
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

   fragment CalloutBlock on WpPage_Acf_pagesection_Contentdesigner_CalloutBlock {
      fieldGroupName
      callout {
         alignment
         eyebrow
         text
         title
         link {
            target
            title
            url
         }
         background {
            image {
               altText
               localFile {
                  ...HeroImage
                  publicURL
               }
            }
            brightness
            color
            size
         }
      }
   }


`