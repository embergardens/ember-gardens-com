export const buildPageFooter = ( globalData, pageData = null ) => {
   const { acfOptionsGlobal: { globalOptions: { footerOptions } } } = globalData
   const { footerLinks, backgroundImage } = footerOptions
   const { hideFooter, footerLinks: linkOverrides } = pageData

   if ( hideFooter ) {
      return null
   }

   const footerObject = {
      sectionbackground: {
         color: 'gradient',
         image: backgroundImage,
         layout: null,
      },
      isFooter: true,
      isHero: false,
      slug: 'footer',
      showinnav: false,
      navigationtitle: null,
      sectiontitle: 'Footer',
      sectionstyle: 'footer',
      footerLinks: linkOverrides || footerLinks,
   }

   return footerObject
}