import { kebabCase } from "lodash"

export const buildSectionObject = ( section ) => {

   const sectionColor = section.sectionstyle !== 'fullWidth'
      ? 'white'
      : section.sectionbackground.color || 'white'

   const sectionLayout = section.sectionstyle !== 'halfWidth'
      ? null
      : section.sectionbackground.layout || 'left'

   const halfOverlayColor = section.sectionstyle === 'halfWidth' && section.sectionbackground.color !== 'none'
      ? section.sectionbackground.color
      : null

   const sectionSlug = section.isHero
      ? section.pageTitle
      : section.navigationtitle ||section.sectiontitle

   const imageSize = section.sectionstyle !== 'halfWidth'
      ? 'cover'
      : section.sectionbackground.imageSize || 'cover'

   const sectionText = section.sectionbackground.color !== 'none'
      ? null
      : section.sectionbackground.textColor || 'dark'

   const sectionObject = {
      background: {
         brightness: section.sectionbackground.brightness || 100,
         color: sectionColor,
         half: halfOverlayColor,
         image: section.sectionbackground.image || null,
         imageBg: section.sectionbackground.imageBackgroundColor || null,
         layout: sectionLayout,
         size: imageSize,
         text: sectionText,
      },
      content: section.contentdesigner || null,
      eyebrow: section.sectioneyebrow || null,
      footerLinks: null,
      isFooter: false,
      isHero: section.isHero || false,
      locationInfo: section.locationInfo || null,
      navDisplay: section.showinnav || false,
      navTitle: section.navigationtitle || null,
      pageTitle: section.pageTitle || null,
      slug: kebabCase( sectionSlug ),
      style: section.sectionstyle || 'standard',
      title: section.sectiontitle || null,
   }

   return sectionObject
}