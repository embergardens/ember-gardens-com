import { graphql } from "gatsby"

export const cardGridBlockFragments = graphql`

    fragment HeroCardGridBlock on WpPage_Acf_Hero_Contentdesigner_CardGridBlock {
        fieldGroupName
        card {
            title
            link {
                target
                title
                url
            }
            image {
                altText
                caption
                localFile {
                    ...SquareImage
                    publicURL
                }
                mediaDetails {
                    width
                    height
                }
            }
        }
    }

    fragment CardGridBlock on WpPage_Acf_pagesection_Contentdesigner_CardGridBlock {
        fieldGroupName
        card {
            title
            link {
                target
                title
                url
            }
            image {
                altText
                caption
                localFile {
                    ...SquareImage
                    publicURL
                }
                mediaDetails {
                    width
                    height
                }
            }
        }
    }

    fragment LocationCardGridBlock on WpLocation_Acf_pagesection_Contentdesigner_CardGridBlock {
        fieldGroupName
        card {
            title
            link {
                target
                title
                url
            }
            image {
                altText
                caption
                localFile {
                    ...SquareImage
                    publicURL
                }
                mediaDetails {
                    width
                    height
                }
            }
        }
    }
`