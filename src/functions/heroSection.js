export const buildPageHero = ( data, title, postType = 'page' ) => {

   let locationHero = {}
   if ( postType === 'location' ) {
      const { address, email, phone, buttongroup, text } = data

      locationHero = {
         locationInfo: {
            intro: text,
            address,
            email,
            phone,
            links: buttongroup,
         }
      }
   }

   const heroObject = {
      ...data,
      isHero: true,
      pageTitle: title,
      postType,
      showinnav: false,
      ...locationHero
   }

   return heroObject
}