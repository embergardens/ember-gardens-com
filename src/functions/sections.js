import { kebabCase } from "lodash"

export const buildSectionObject = ( section ) => {

   const sectionColor = section.sectionstyle === 'halfWidth'
      ? 'white'
      : section.sectionbackground.color || 'white'

   const sectionLayout = section.sectionstyle !== 'halfWidth'
      ? null
      : section.sectionbackground.layout || 'left'

   const sectionSlug = section.isHero
      ? section.pageTitle
      : section.navigationtitle ||section.sectiontitle

   const sectionObject = {
      background: {
         brightness: section.sectionbackground.brightness || 100,
         color: sectionColor,
         image: section.sectionbackground.image || null,
         layout: sectionLayout,
      },
      content: section.contentdesigner || null,
      eyebrow: section.eyebrow || null,
      footerLinks: null,
      isFooter: false,
      isHero: section.isHero || false,
      navDisplay: section.showinnav || false,
      navTitle: section.navigationtitle || null,
      pageTitle: section.pageTitle || null,
      slug: kebabCase( sectionSlug ),
      style: section.sectionstyle || 'standard',
      title: section.sectiontitle || null,
   }

   return sectionObject
}