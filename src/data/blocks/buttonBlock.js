import { graphql } from "gatsby"

export const buttonBlockFragments = graphql`

   fragment HeroButtonBlock on WpPage_Acf_Hero_Contentdesigner_Buttonblock {
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

   fragment LocationButtonBlock on WpLocation_Acf_pagesection_Contentdesigner_Buttonblock {
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

   fragment HeroLocationButtonBlock on WpLocation_Acf_Hero {
      buttongroup {
         button {
            target
            title
            url
         }
         style
      }
   }
`