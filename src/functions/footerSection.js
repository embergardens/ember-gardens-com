export const buildPageFooter = ( globalData, pageData = null ) => {
   const { acfOptionsGlobal: { globalOptions: { footerOptions } } } = globalData
   const { footerLinks, backgroundImage } = footerOptions
   const { hideFooter, footerLinks: linkOverrides } = pageData

   if ( hideFooter ) {
      return null
   }

   const footerObject = {
      background: {
         brightness: 100,
         color: 'gradient',
         image: backgroundImage || null,
         layout: null,
      },
      footerLinks: linkOverrides || footerLinks,
      isFooter: true,
      isHero: false,
      navDisplay: false,
      navTitle: null,
      pageTitle: null,
      slug: 'footer',
      style: 'footer',
      title: 'Footer'
   }

   return footerObject
}