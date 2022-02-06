import { graphql } from "gatsby"

export const textBlockFragments = graphql`

   fragment HeroTextBlock on WpPage_Acf_Hero_Contentdesigner_Textblock {
      fieldGroupName
      text
   }

   fragment TextBlock on WpPage_Acf_pagesection_Contentdesigner_Textblock {
      fieldGroupName
      text
   }

   fragment LocationTextBlock on WpLocation_Acf_pagesection_Contentdesigner_Textblock {
      fieldGroupName
      text
   }
`