import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const SectionBackground = ({ data }) => {

   const { image } = data

   return (
      <div className="sectionBackground">
         {/* <GatsbyImage
            alt={image.node.altText}
            image={image}
            className="backgroundMedia__img"
         /> */}
      </div>
   )
}