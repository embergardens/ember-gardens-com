import { graphql } from "gatsby"

export const textBlockFragments = graphql`

   fragment HeroFormBlock on WpPage_Acf_Hero_Contentdesigner_FormBlock {
      fieldGroupName
      gravityFormSelect
   }

   fragment FormBlock on WpPage_Acf_pagesection_Contentdesigner_FormBlock {
      fieldGroupName
      gravityFormSelect
   }

   fragment LocationFormBlock on WpLocation_Acf_pagesection_Contentdesigner_FormBlock {
      fieldGroupName
      gravityFormSelect
   }
`